using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using Backend.Dtos.Registro;
using Mapster;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistroController : ControllerBase
    {
        private readonly BackendContext _context;

        public RegistroController(BackendContext context)
        {
            _context = context;
        }

        // GET: api/Registro/ListarRegistros
        [HttpGet("/ListarRegistros")]
        public async Task<ActionResult<IEnumerable<Registro>>> ListarRegistros()
        {
            return await _context.Registro.ToListAsync();
        }

        // GET: api/Registro/ListarRegistroPorId/id
        [HttpGet("/ListarRegistroPorId/{id}")]
        public async Task<ActionResult<Registro>> ListarRegistroPorId(Guid id)
        {
            var registro = await _context.Registro.FindAsync(id);

            if (registro == null)
            {
                return NotFound();
            }

            return registro;
        }

        // Patch: api/Registro/AtualizarRegistro/id
        [HttpPatch("/AtualizarRegistro/{id}")]
        public async Task<IActionResult> AtualizarRegistro(Guid id, PatchRegistroRequest request)
        {
            var registro = await _context.Registro.FindAsync(id);

            if (registro == null)
            {
                return NotFound();
            }

            request.Adapt(registro);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegistroExists(id))
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

        // POST: api/Registro/InserirRegistro
        [HttpPost("/InserirRegistro")]
        public async Task<ActionResult<Registro>> InserirRegistro(Registro registro)
        {
            _context.Registro.Add(registro);
            await _context.SaveChangesAsync();

            return CreatedAtAction("ListarRegistroPorId", new { id = registro.Id }, registro);
        }

        // DELETE: api/Registro/DeletarRegistro/id
        [HttpDelete("/DeletarRegistro/{id}")]
        public async Task<IActionResult> DeletarRegistro(Guid id)
        {
            var registro = await _context.Registro.FindAsync(id);
            if (registro == null)
            {
                return NotFound();
            }

            _context.Registro.Remove(registro);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegistroExists(Guid id)
        {
            return _context.Registro.Any(e => e.Id == id);
        }
    }
}
