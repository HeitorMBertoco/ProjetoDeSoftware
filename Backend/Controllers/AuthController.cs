using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Data;
using Backend.Dtos.Auth;
using Backend.Dtos.Email;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IEmailService _emailService;
    private readonly BackendContext _context;
    private readonly IConfiguration _configuration;
    private readonly Hasher _hasher;

    public AuthController(BackendContext context, IConfiguration configuration, IEmailService emailService, Hasher hasher)
    {
        _context = context;
        _configuration = configuration;
        _emailService = emailService;
        _hasher = hasher;
    }

    [HttpPost("Login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] PostLoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Login) || string.IsNullOrWhiteSpace(request.Senha))
        {
            return Unauthorized(new { mensagem = "Credenciais inválidas." });
        }

        var usuario = await _context.Usuario
            .FirstOrDefaultAsync(u => u.Login == request.Login);

        if (usuario == null || !usuario.VerificarSenha(request.Senha))
        {
            return Unauthorized(new { mensagem = "Credenciais inválidas." });
        }

        if (!usuario.Ativo)
        {
            return StatusCode(StatusCodes.Status403Forbidden, new { mensagem = "Esta conta está desativada." });
        }

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, usuario.Login),
            new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
        };

        var secretKey = _configuration.GetValue<string>("JwtSettings:SecretKey")
            ?? throw new InvalidOperationException("Chave secreta não configurada.");
        var expirationInMinutes = _configuration.GetValue<int>("JwtSettings:ExpirationInMinutes");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expirationInMinutes == 0 ? 60 : expirationInMinutes),
            signingCredentials: creds
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        return Ok(new { token = tokenString, tipo = "Bearer" });
    }

    [HttpPost("RecuperarSenha")]
    public async Task<IActionResult> RecuperarSenha([FromBody] RecuperarSenhaRequest request)
    {
        var usuario = await _context.Usuario.FirstOrDefaultAsync(u => u.Login == request.Email);

        if (usuario == null)
        {
            return BadRequest(new { message = "E-mail não encontrado." });
        }

        var token = _hasher.GerarTokenRecuperacao();

        usuario.TokenRecuperacao = token;
        usuario.TokenValidade = DateTime.UtcNow.AddHours(1);

        string linkRedefinicao = $"https://meufrontend.com{token}";

        var emailRequest = new EmailRequest
        {
            ToEmail = request.Email,
            Subject = "Recuperação de Senha",
            Body = $@"
                <div style='font-family: Arial, sans-serif; padding: 20px;'>
                    <h2>Recuperação de Conta</h2>
                    <p>Você solicitou a redefinição de senha para este e-mail.</p>
                    <p>Clique no botão abaixo para criar uma nova senha. Este link expira em 1 hora.</p>
                    <a href='{linkRedefinicao}' style='background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;'>Redefinir Senha</a>
                    <hr style='border: 0; border-top: 1px solid #ccc; margin-top: 20px;' />
                    <p style='font-size: 12px; color: #666;'>Se você não solicitou esta alteração, ignore este e-mail.</p>
                </div>"
        };

        try
        {
            await _emailService.SendEmailAsync(emailRequest);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Se o e-mail informado estiver cadastrado, um link de recuperação foi enviado." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erro ao enviar o e-mail.", detalhes = ex.Message });
        }
    }

    [HttpPost("ValidarTokenRecuperacao")]
    public async Task<IActionResult> ValidarTokenRecuperacao([FromBody] ValidarTokenRecuperacaoRequest request)
    {
        var usuario = await _context.Usuario.FirstOrDefaultAsync(u => u.TokenRecuperacao == request.Token);

        if (usuario == null)
        {
            return BadRequest(new { message = "Token inválido ou expirado." });
        }

        if (usuario.TokenValidade < DateTime.UtcNow)
        {
            return BadRequest(new { message = "Token expirado." });
        }

        usuario.SenhaHash = _hasher.HashPassword(request.NovaSenha, usuario.SenhaSalt);
        usuario.TokenRecuperacao = null;
        usuario.TokenValidade = null;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Token válido." });
    }
}