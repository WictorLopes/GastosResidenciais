using System.ComponentModel.DataAnnotations;

namespace GastosResidenciais.Backend.Domain.Entities
{
    /// <summary>
    /// Representa uma pessoa do sistema.
    /// </summary>
    public class Pessoa
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Nome { get; set; } = string.Empty;

        public int Idade { get; set; }

        /// <summary>
        /// Transações associadas à pessoa.
        /// </summary>
        public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
    }
}
