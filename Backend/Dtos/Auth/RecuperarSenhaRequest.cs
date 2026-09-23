using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.Email;
public class RecuperarSenhaRequest
{
    [Required(ErrorMessage = "O campo de e-mail é obrigatório.")]
    [EmailAddress(ErrorMessage = "O formato do e-mail digitado é inválido.")]
    public string Email { get; set; } = string.Empty;
}