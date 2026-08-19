using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Usuario
{
    [Key] public Guid Id { get; set; }
    [StringLength(100)] public String Nome { get; set; }
    [StringLength(150)] public String? Sobrenome { get; set; }
    [StringLength(100)] public String Login { get; set; }
    [StringLength(32)] public String Senha { get; set; }
    public Boolean LembrarDeMim { get; set; } = false;
    public Boolean Ativo { get; set; } = true;

    public Usuario(string nome, string? sobrenome, string login, string senha)
    {
        Nome = nome;
        Sobrenome = sobrenome;
        Login = login;
        Senha = senha;
    }
}
