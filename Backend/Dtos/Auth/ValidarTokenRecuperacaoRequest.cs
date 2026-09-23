using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.Email;
public class ValidarTokenRecuperacaoRequest
{
    [Required(ErrorMessage = "O campo de token é obrigatório.")]
    public string Token { get; set; } = string.Empty;
    [Required(ErrorMessage = "O campo de senha é obrigatório.")]
    public string NovaSenha { get; set; } = string.Empty;
}