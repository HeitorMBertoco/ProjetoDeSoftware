using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Dtos.Aluno
{
    public class PostAlunoRequest
    {
        public required String Nome { get; set; }
        public int Idade { get; set; }
        public required String Cpf { get; set; }
        public required String Rm { get; set; }
    }
}