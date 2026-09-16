using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Dtos.Auth
{
    public record PostLoginRequest
    {
        public required String Login { get; set; }
        public required String Senha { get; set; }
    }
}