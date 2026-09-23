using System.Security.Cryptography;
using System.Text;
using Konscious.Security.Cryptography;

namespace Backend.Models
{
    public class Hasher
    {
        public string GerarTokenRecuperacao()
        {
            using (var rng = RandomNumberGenerator.Create())
            {
                byte[] tokenData = new byte[32];
                rng.GetBytes(tokenData);
                return Convert.ToBase64String(tokenData);
            }
        }
        public byte[] HashPassword(string password, byte[] salt)
        {
            using (var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password)))
            {
                argon2.Salt = salt;
                argon2.DegreeOfParallelism = 4;
                argon2.MemorySize = 65536;
                argon2.Iterations = 4;

                return argon2.GetBytes(32);
            }
        }

        public byte[] GenerateSalt()
        {
            byte[] salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }

        public bool VerifyPassword(string enteredPassword, byte[] storedHash, byte[] storedSalt)
        {
            using (var argon2 = new Argon2id(Encoding.UTF8.GetBytes(enteredPassword)))
            {
                argon2.Salt = storedSalt;
                argon2.DegreeOfParallelism = 4;
                argon2.MemorySize = 65536;
                argon2.Iterations = 4;

                byte[] newHash = argon2.GetBytes(32);

                return CryptographicOperations.FixedTimeEquals(newHash, storedHash);
            }
        }
    }
}
