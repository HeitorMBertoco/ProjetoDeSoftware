using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Dtos.Turma;

public record PatchAdicionarAlunosTurmaRequest
{
    public required Guid turmaId { get; set; }
    public required List<Backend.Models.Aluno> Alunos { get; set; }
}
