using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Dtos.Turma;

public record PatchAdicionarAlunosTurmaRequest
{
    public required Guid TurmaId { get; set; }
    public required List<Guid> AlunoIds { get; set; }
}
