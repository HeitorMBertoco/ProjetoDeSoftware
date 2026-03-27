using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Turma
    {
        [Key] public Guid Id { get; set; }
        [StringLength(100)] public String Nome { get; set; }
        public int QuantidadeMaximaAlunos { get; set; }
        [StringLength(100)] public String Curso { get; set; }
        public List<Aluno> ListaAlunos { get; set; } = [];

        public Turma(string nome, int quantidadeMaximaAlunos, string curso)
        {
            Nome = nome;
            QuantidadeMaximaAlunos = quantidadeMaximaAlunos;
            Curso = curso;
        }

    }
}