using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Dtos.Registro
{
    public record PatchRegistroRequest
    {
        public Guid? AlunoId { get; set; }
        public DateTime? Data { get; set; }
        public String? Motivo { get; set; }
        public String? QuemEmitiu { get; set; }
        public String? QuemPermitiu { get; set; }
        public String? QuemBuscou { get; set; }
        public String? Telefone { get; set; }
    }
}