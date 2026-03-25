using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class BackendContext : DbContext
    {
        public BackendContext (DbContextOptions<BackendContext> options)
            : base(options)
        {
        }

        public DbSet<Backend.Models.Usuario> Usuario { get; set; } = default!;
        public DbSet<Backend.Models.Aluno> Aluno { get; set; } = default!;
        public DbSet<Backend.Models.Registro> Registro { get; set; } = default!;
    }
}
