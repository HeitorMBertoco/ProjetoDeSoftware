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
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    [Authorize]
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
        [HttpGet("ListarRegistros")]
        public async Task<ActionResult<IEnumerable<Registro>>> ListarRegistros()
        {
            return await _context.Registro
            .Include(registro => registro.Aluno)
            .ToListAsync();
        }

        // GET: api/Registro/ListarRegistrosPorPagina
        [HttpGet("ListarRegistrosPorPagina")]
        public async Task<ActionResult<IEnumerable<Registro>>> ListarRegistrosPorPagina([FromQuery] int pagina = 1)
        {
            return await _context.Registro
            .Include(registro => registro.Aluno)
            .Skip((pagina - 1) * 10)
            .Take(10)
            .ToListAsync();
        }

        // GET: api/Registro/ListarRegistrosAtivos
        [HttpGet("ListarRegistrosAtivos")]
        public async Task<ActionResult<IEnumerable<Registro>>> ListarRegistrosAtivos()
        {
            return await _context.Registro
            .Include(registro => registro.Aluno)
            .Where(r => r.Ativo)
            .ToListAsync();
        }

        // GET: api/Registro/ListarRegistrosAtivosPorPagina
        [HttpGet("ListarRegistrosAtivosPorPagina")]
        public async Task<ActionResult<IEnumerable<Registro>>> ListarRegistrosAtivosPorPagina([FromQuery] int pagina = 1)
        {
            return await _context.Registro
            .Include(registro => registro.Aluno)
            .Where(r => r.Ativo)
            .Skip((pagina - 1) * 10)
            .Take(10)
            .ToListAsync();
        }

        // GET: api/Registro/ListarRegistroPorId/id
        [HttpGet("ListarRegistroPorId/{id}")]
        public async Task<ActionResult<Registro>> ListarRegistroPorId(Guid id)
        {
            var registro = await _context.Registro
            .Include(registro => registro.Aluno)
            .FirstOrDefaultAsync(registro => registro.Id == id);

            if (registro == null)
            {
                return NotFound();
            }

            return registro;
        }

        // Patch: api/Registro/AtualizarRegistro/id
        [HttpPatch("AtualizarRegistro/{id}")]
        public async Task<IActionResult> AtualizarRegistro(Guid id, PatchRegistroRequest request)
        {
            var registro = await _context.Registro.FindAsync(id);

            if (registro == null)
            {
                return NotFound();
            }

            var aluno = await _context.Aluno.FindAsync(request.AlunoId);

            if (aluno == null)
            {
                return NotFound($"Aluno com o id: {request.AlunoId} não encontrado");
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
        [HttpPost("InserirRegistro")]
        public async Task<ActionResult<Registro>> InserirRegistro(PostRegistroRequest request)
        {

            var aluno = await _context.Aluno.FindAsync(request.AlunoId);

            if (aluno == null)
            {
                return NotFound($"Aluno com o id: {request.AlunoId} não encontrado");
            }

            Registro registro = new Registro(
                request.AlunoId,
                request.Data,
                request.EntradaSaida,
                request.Motivo ?? "",
                request.QuemEmitiu,
                request.QuemPermitiu,
                request.QuemBuscou,
                request.Telefone ?? ""
            );

            aluno.QuantidadeFaltas += 1;

            _context.Registro.Add(registro);
            await _context.SaveChangesAsync();

            return CreatedAtAction("ListarRegistroPorId", new { id = registro.Id }, registro);
        }

        // DELETE: api/Registro/AlternarEstadoRegistro/id
        [HttpDelete("AlternarEstadoRegistro/{id}")]
        public async Task<IActionResult> AlternarEstadoRegistro(Guid id)
        {
            var registro = await _context.Registro.FindAsync(id);

            if (registro == null)
            {
                return NotFound();
            }

            registro.Ativo = registro.Ativo ? false : true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegistroExists(Guid id)
        {
            return _context.Registro.Any(e => e.Id == id);
        }
    }
}
