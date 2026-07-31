using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Dtos.Registro
{
    public class PostRegistroRequest
    {
    public Guid AlunoId { get; set; }
    public DateTime Data { get; set; } = DateTime.Now;
    public String? Motivo { get; set; }
    public required String QuemEmitiu { get; set; }
    public required String QuemPermitiu { get; set; }
    public required String QuemBuscou { get; set; }
    public String? Telefone { get; set; }
    }
}