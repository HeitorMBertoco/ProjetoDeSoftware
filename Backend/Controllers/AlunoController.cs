using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using Mapster;
using Microsoft.CodeAnalysis.FlowAnalysis;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http.HttpResults;
using Backend.Dtos.Aluno;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunoController : ControllerBase
    {
        private readonly BackendContext _context;

        public AlunoController(BackendContext context)
        {
            _context = context;
        }

        // GET: api/Aluno/ListarAlunos
        [HttpGet("/ListarAlunos")]
        public async Task<ActionResult<IEnumerable<Aluno>>> ListarAlunos()
        {
            return await _context.Aluno.ToListAsync();
        }

        // GET: api/Aluno/ListarAlunosComFaltas
        [HttpGet("/ListarAlunosComFaltas")]
        public async Task<ActionResult<IEnumerable<Aluno>>> ListarAlunosComFaltas()
        {
            var alunos = _context.Aluno.Where(aluno => aluno.QuantidadeFaltas >= 1);

            if (alunos.IsNullOrEmpty())
            {
                return NotFound("Não há alunos com faltas registradas!");
            }

            return Ok(alunos);
        }

        // GET: api/Aluno/ListarAlunosComFaltasExcessivas
        [HttpGet("/ListarAlunosComFaltasExcessivas")]
        public async Task<ActionResult<IEnumerable<Aluno>>> ListarAlunosComFaltasExcessivas()
        {
            var alunos = _context.Aluno.Where(aluno => aluno.QuantidadeFaltas >= 3);

            if (alunos.IsNullOrEmpty())
            {
                return NotFound("Não há alunos com faltas excessivas registradas!");
            }

            return Ok(alunos);
        }

        // GET: api/Aluno/ListarAlunosPorNome
        [HttpGet("/ListarAlunosPorNome/{nome}")]
        public async Task<ActionResult<IEnumerable<Aluno>>> ListarAlunosPorNome(string nome)
        {
            var alunos = _context.Aluno.Where(aluno => aluno.Nome.Contains(nome));

            if (alunos.IsNullOrEmpty())
            {
                return NotFound("Não há alunos com esse nome!");
            }

            return Ok(alunos);
        }

        // GET: api/Aluno/ListarAlunosPorTurma
        [HttpGet("/ListarAlunosPorTurma/{turma}")]
        public async Task<ActionResult<IEnumerable<Aluno>>> ListarAlunosPorTurma(string turma)
        {
            var alunos = _context.Aluno.Where(aluno => aluno.Turma.Contains(turma));

            if (alunos.IsNullOrEmpty())
            {
                return NotFound("Não há alunos nessa turma!");
            }

            return Ok(alunos);
        }

        // GET: api/Aluno/ListarAlunosPorTurmaENome
        [HttpGet("/ListarAlunosPorTurmaENome/{nome}/{turma}")]
        public async Task<ActionResult<IEnumerable<Aluno>>> ListarAlunosPorTurmaENome(string nome, string turma)
        {
            var alunos = _context.Aluno.Where(aluno => aluno.Nome.Contains(nome) && aluno.Turma.Contains(turma));

            if (alunos.IsNullOrEmpty())
            {
                return NotFound("Não há alunos com esse nome nessa turma!");
            }

            return Ok(await alunos.ToListAsync());
        }

        // GET: api/Aluno/ListarAlunoPorId/id
        [HttpGet("/ListarAlunoPorId/{id}")]
        public async Task<ActionResult<Aluno>> ListarAlunoPorId(Guid id)
        {
            var aluno = await _context.Aluno.FindAsync(id);

            if (aluno == null)
            {
                return NotFound();
            }

            return aluno;
        }

        // PATCH: api/Aluno/AtualizarAluno/id
        [HttpPatch("/AtualizarAluno/{id}")]
        public async Task<IActionResult> AtualizarAluno(Guid id, PatchAlunoRequest request)
        {
            var aluno = await _context.Aluno.FindAsync(id);

            if (aluno == null)
            {
                return NotFound();
            }

            request.Adapt(aluno);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlunoExists(id))
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

        // POST: api/Aluno/InserirAluno
        [HttpPost("/InserirAluno")]
        public async Task<ActionResult<Aluno>> InserirAluno(Aluno aluno)
        {
            _context.Aluno.Add(aluno);
            await _context.SaveChangesAsync();

            return CreatedAtAction("ListarAlunoPorId", new { id = aluno.Id }, aluno);
        }

        // DELETE: api/Aluno/DeletarAluno/id
        [HttpDelete("/DeletarAluno/{id}")]
        public async Task<IActionResult> DeletarAluno(Guid id)
        {
            var aluno = await _context.Aluno.FindAsync(id);
            if (aluno == null)
            {
                return NotFound();
            }

            _context.Aluno.Remove(aluno);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AlunoExists(Guid id)
        {
            return _context.Aluno.Any(e => e.Id == id);
        }
    }
}
