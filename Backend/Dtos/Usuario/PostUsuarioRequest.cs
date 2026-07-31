using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Dtos.Usuario
{
    public class PostUsuarioRequest
    {
        public required String Nome { get; set; }
        public String? Sobrenome { get; set; }
        public required String Login { get; set; }
        public required String Senha { get; set; }
    }
}