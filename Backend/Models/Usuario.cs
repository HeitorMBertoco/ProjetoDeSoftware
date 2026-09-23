using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Usuario
{
    [Key] public Guid Id { get; set; }
    [StringLength(100)] public string Nome { get; set; } = string.Empty;
    [StringLength(150)] public string? Sobrenome { get; set; }
    [StringLength(100)] public string Login { get; set; } = string.Empty;
    [Required] public byte[] SenhaHash { get; set; } = Array.Empty<byte>();
    [Required] public byte[] SenhaSalt { get; set; } = Array.Empty<byte>();
    public string? TokenRecuperacao { get; set; }
    public DateTime? TokenValidade { get; set; }
    public bool LembrarDeMim { get; set; } = false;
    public string? NomeArquivoFoto { get; set; }
    public bool Ativo { get; set; } = true;

    public Usuario()
    {
    }

    public static Usuario CriarComSenha(string nome, string? sobrenome, string login, string senha)
    {
        var (hash, salt) = SenhaUsuario.Criar(senha);

        return new Usuario
        {
            Nome = nome,
            Sobrenome = sobrenome,
            Login = login,
            SenhaHash = hash,
            SenhaSalt = salt,
            Ativo = true
        };
    }

    public bool VerificarSenha(string senha)
    {
        return SenhaUsuario.Verificar(senha, SenhaHash, SenhaSalt);
    }
}