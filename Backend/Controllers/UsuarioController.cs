using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using Backend.Dtos.Usuario;
using Mapster;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly BackendContext _context;

        public UsuarioController(BackendContext context)
        {
            _context = context;
        }

        // GET: api/Usuario/ListarUsuarios
        [HttpGet("/ListarUsuarios")]
        public async Task<ActionResult<IEnumerable<Usuario>>> ListarUsuarios()
        {
            return await _context.Usuario.ToListAsync();
        }

        // GET: api/Usuario/ListarUsuarioPorId/id
        [HttpGet("/ListarUsuarioPorId/{id}")]
        public async Task<ActionResult<Usuario>> ListarUsuarioPorId(Guid id)
        {
            var usuario = await _context.Usuario.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        // PATCH: api/Usuario/AtualizarUsuario/id
        [HttpPatch("/AtualizarUsuario/{id}")]
        public async Task<IActionResult> AtualizarUsuario(Guid id, PatchUsuarioRequest request)
        {
            var usuario = await _context.Usuario.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            if(request.Nome != null){
                usuario.Nome = request.Nome;
            }

            if(request.Sobrenome != null){
                usuario.Sobrenome = request.Sobrenome;
            }

            if(request.Login != null){
                usuario.Login = request.Login;
            }

            if(request.Senha != null){
                var (hash, salt) = SenhaUsuario.Criar(request.Senha);
                usuario.SenhaHash = hash;
                usuario.SenhaSalt = salt;
            }

            if(request.LembrarDeMim != null){
                usuario.LembrarDeMim = request.LembrarDeMim.Value;
            }

            if(request.Ativo != null){
                usuario.Ativo = request.Ativo.Value;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PATCH: api/Usuario/AtualizarImagemUsuario/id
        [HttpPatch("/AtualizarImagemUsuario/{id}")]
        public async Task<IActionResult> AtualizarImagemUsuario(Guid id, IFormFile arquivo)
        {
            var usuario = await _context.Usuario.FindAsync(id);

            if (usuario == null)
            {
                return NotFound("usuario não encontrado");
            }

            var extensao = Path.GetExtension(arquivo.FileName).ToLower();

            var diretorioDestino = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "imagens");

            var caminhoArquivo = Path.Combine(diretorioDestino, $"{id}{extensao}");

            if (!string.IsNullOrEmpty(usuario.NomeArquivoFoto) && System.IO.File.Exists(Path.Combine(diretorioDestino, usuario.NomeArquivoFoto)))
            {
                System.IO.File.Delete(Path.Combine(diretorioDestino, usuario.NomeArquivoFoto));
            }

            using (var stream = new FileStream(caminhoArquivo, FileMode.Create))
            {
                await arquivo.CopyToAsync(stream);
            }

            usuario.NomeArquivoFoto = Path.Combine($"{id}{extensao}");

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Usuario/InserirUsuario
        [HttpPost("/InserirUsuario")]
        public async Task<ActionResult<Usuario>> InserirUsuario(PostUsuarioRequest request)
        {
            Usuario usuario = Usuario.CriarComSenha(
                request.Nome,
                request.Sobrenome ?? "",
                request.Login,
                request.Senha
            );

            _context.Usuario.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("ListarUsuarioPorId", new { id = usuario.Id }, usuario);
        }

        // DELETE: api/Usuario/DeletarUsuario/id
        [HttpDelete("/DeletarUsuario/{id}")]
        public async Task<IActionResult> DeletarUsuario(Guid id)
        {
            var usuario = await _context.Usuario.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(usuario.NomeArquivoFoto))
            {
                var diretorioDestino = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "imagens");

                var caminhoArquivo = Path.Combine(diretorioDestino, usuario.NomeArquivoFoto);

                if (System.IO.File.Exists(caminhoArquivo))
                {
                    System.IO.File.Delete(caminhoArquivo);
                }
            }

            _context.Usuario.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuarioExists(Guid id)
        {
            return _context.Usuario.Any(e => e.Id == id);
        }
    }
}
