namespace Backend.Models;

public static class SenhaUsuario
{
    public static (byte[] Hash, byte[] Salt) Criar(string senha)
    {
        if (string.IsNullOrWhiteSpace(senha))
        {
            throw new ArgumentException("A senha não pode ser vazia.", nameof(senha));
        }

        var hasher = new Hasher();
        var salt = hasher.GenerateSalt();
        var hash = hasher.HashPassword(senha, salt);

        return (hash, salt);
    }

    public static bool Verificar(string senha, byte[] senhaHash, byte[] salt)
    {
        if (string.IsNullOrWhiteSpace(senha))
        {
            throw new ArgumentException("A senha não pode ser vazia.", nameof(senha));
        }

        return new Hasher().VerifyPassword(senha, senhaHash, salt);
    }
}
