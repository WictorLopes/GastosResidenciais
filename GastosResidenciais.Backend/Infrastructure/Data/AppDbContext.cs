using GastosResidenciais.Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Backend.Infrastructure.Data
{
    /// <summary>
    /// Contexto principal do banco de dados.
    /// Responsável por mapear as entidades para tabelas.
    /// </summary>
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) :
            base(options)
        {
        }

        public DbSet<Pessoa> Pessoas { get; set; }

        public DbSet<Categoria> Categorias { get; set; }

        public DbSet<Transacao> Transacoes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Enum como int
            modelBuilder
                .Entity<Categoria>()
                .Property(c => c.Finalidade)
                .HasConversion<int>();

            modelBuilder
                .Entity<Transacao>()
                .Property(t => t.Tipo)
                .HasConversion<int>();

            // Delete em cascata:
            // Se uma pessoa for removida, todas as transações dela também serão
            modelBuilder
                .Entity<Transacao>()
                .HasOne(t => t.Pessoa)
                .WithMany(p => p.Transacoes)
                .HasForeignKey(t => t.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
