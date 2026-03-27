using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Backend.Enums;

namespace Backend.Models;

public class Registro
{
    [Key] public Guid Id { get; set; }
    public Guid AlunoId { get; set; }
    public Aluno? Aluno { get; set; }
    public DateTime Data { get; set; } = DateTime.Now;
    public String? Motivo { get; set; }
    [StringLength(100)] public String QuemEmitiu { get; set; }
    [StringLength(100)] public String QuemPermitiu { get; set; }
    [StringLength(100)] public String QuemBuscou { get; set; }
    public String? Telefone { get; set; }

    public Registro(Guid alunoId, DateTime data, string motivo, string quemEmitiu, string quemPermitiu, string quemBuscou, string? telefone)
    {
        AlunoId = alunoId;
        Data = data;
        Motivo = motivo;
        QuemEmitiu = quemEmitiu;
        QuemPermitiu = quemPermitiu;
        QuemBuscou = quemBuscou;
        Telefone = telefone;
    }
}
