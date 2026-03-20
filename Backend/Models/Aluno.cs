using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models;

public class Aluno
{
    [Key] public Guid Id { get; set; }
    [StringLength(100)] public String Nome { get; set; }
    public int Idade { get; set; }
    [StringLength(11)] public String Cpf { get; set; }
    public String Rm { get; set; }
    [StringLength(50)] public String Turma { get; set; }
    public int QuantidadeFaltas { get; set; } = 0;

    public Aluno(string nome, int idade, string cpf, string rm, string turma)
    {
        Nome = nome;
        Idade = idade;
        Cpf = cpf;
        Rm = rm;
        Turma = turma;
    }
}
