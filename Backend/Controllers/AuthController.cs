using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Data; // Certifique-se de importar o seu contexto
using Backend.Dtos.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly BackendContext _context;
    private readonly IConfiguration _configuration;

    // Injetamos o banco de dados e a configuração da chave
    public AuthController(BackendContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] PostLoginRequest request)
    {
        var usuario = await _context.Usuario
            .FirstOrDefaultAsync(u => u.Login == request.Login);

        // 2. Valida se o usuário existe e se a senha está correta 
        // (Nota: Em produção, lembre-se de usar hash de senha como BCrypt/Argon2!)
        if (usuario == null || usuario.Senha != request.Senha)
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
}
