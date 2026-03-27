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

namespace Backend.Controllers
{
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

            request.Adapt(usuario);

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
        public async Task<ActionResult<Usuario>> InserirUsuario(Usuario usuario)
        {
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
