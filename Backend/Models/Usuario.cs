using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Usuario
{
    [Key] public Guid Id { get; set; }
    [StringLength(100)] public required String Nome { get; set; }
    [StringLength(150)] public String? Sobrenome { get; set; }
    [StringLength(100)] public required String Login { get; set; }
    [StringLength(32)] public required String Senha { get; set; }
}
