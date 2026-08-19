using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using Backend.Dtos.Turma;
using Mapster;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TurmaController : ControllerBase
    {
        private readonly BackendContext _context;

        public TurmaController(BackendContext context)
        {
            _context = context;
        }

        // GET: api/Turma/ListarTurmas
        [HttpGet("/ListarTurmas")]
        public async Task<ActionResult<IEnumerable<Turma>>> ListarTurmas()
        {
            return await _context.Turma.ToListAsync();
        }

        // GET: api/Turma/ListarTurmaPorId/id
        [HttpGet("/ListarTurmaPorId/{id}")]
        public async Task<ActionResult<Turma>> ListarTurmaPorId(Guid id)
        {
            var turma = await _context.Turma.FindAsync(id);

            if (turma == null)
            {
                return NotFound();
            }

            return turma;
        }

        // PATCH: api/Turma/AtualizarTurma/id
        [HttpPatch("/AtualizarTurma/{id}")]
        public async Task<IActionResult> AtualizarTurma(Guid id, PatchTurmaRequest request)
        {
            var turma = await _context.Turma.FindAsync(id);

            if (turma == null)
            {
                return NotFound();
            }

            request.Adapt(turma);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TurmaExists(id))
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

        // POST: api/Turma/InserirTurma
        [HttpPost("/InserirTurma")]
        public async Task<ActionResult<Turma>> InserirTurma(PostTurmaRequest request)
        {
            Turma turma = new Turma(
                request.Nome,
                request.QuantidadeMaximaAlunos,
                request.Curso
            );

            _context.Turma.Add(turma);
            await _context.SaveChangesAsync();

            return CreatedAtAction("ListarTurmaPorId", new { id = turma.Id }, turma);
        }

        // PATCH: api/Turma/InserirAlunos/id
        [HttpPatch("/InserirAlunos")]
        public async Task<IActionResult> InserirAlunos(PatchAdicionarAlunosTurmaRequest request)
        {
            var turma = await _context.Turma.FindAsync(request.TurmaId);

            if (turma == null)
            {
                return NotFound();
            }

            foreach (Guid id in request.AlunoIds)
            {
                try
                {
                    var aluno = await _context.Aluno.FindAsync(id);

                    if(aluno == null)
                    {
                        throw new ArgumentException($"O aluno com o Id: {id} não existe");
                    }

                    if (turma.ListaAlunos.Count + request.AlunoIds.Count > turma.QuantidadeMaximaAlunos)
                    {
                        throw new IndexOutOfRangeException($"A quantidade de alunos inseridos excede o limite máximo permitido nessa turma");
                    }

                    turma.ListaAlunos.Add(aluno);
                }
                catch (Exception erro)
                {
                    return BadRequest($"Erro ao inserir alunos na turma: {erro}");
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TurmaExists(request.TurmaId))
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

        // DELETE: api/Turma/DeletarTurma/id
        [HttpDelete("/DeletarTurma/{id}")]
        public async Task<IActionResult> DeletarTurma(Guid id)
        {
            var turma = await _context.Turma.FindAsync(id);
            if (turma == null)
            {
                return NotFound();
            }

            _context.Turma.Remove(turma);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TurmaExists(Guid id)
        {
            return _context.Turma.Any(e => e.Id == id);
        }
    }
}
