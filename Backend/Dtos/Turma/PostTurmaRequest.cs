using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Dtos.Turma
{
    public class PostTurmaRequest
    {
        public required String Nome { get; set; }
        public int QuantidadeMaximaAlunos { get; set; }
        public required String Curso { get; set; }
    }
}