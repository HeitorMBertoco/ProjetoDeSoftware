using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Dtos.Turma
{
    public record PatchTurmaRequest
    {
        public String? Nome { get; set; }
        public int? QuantidadeMaximaAlunos { get; set; }
        public String? Curso { get; set; }
    }
}