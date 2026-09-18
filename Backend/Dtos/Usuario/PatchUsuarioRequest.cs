using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Dtos.Usuario
{
    public record PatchUsuarioRequest
    {
        public String? Nome { get; set; }
        public String? Sobrenome { get; set; }
        public String? Login { get; set; }
        public String? Senha { get; set; }
        public Boolean? LembrarDeMim { get; set; }
        public Boolean? Ativo { get; set; }
    }
}