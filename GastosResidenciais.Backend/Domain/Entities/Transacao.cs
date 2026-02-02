using System.ComponentModel.DataAnnotations;
using GastosResidenciais.Backend.Domain.Enums;

namespace GastosResidenciais.Backend.Domain.Entities
{
    /// <summary>
    /// Representa uma transação financeira.
    /// </summary>
    public class Transacao
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(400)]
        public string Descricao { get; set; } = string.Empty;

        /// <summary>
        /// Valor da transação (sempre positivo).
        /// </summary>
        [Range(0.01, double.MaxValue)]
        public decimal Valor { get; set; }

        public TipoTransacao Tipo { get; set; }

        public int PessoaId { get; set; }
        public Pessoa Pessoa { get; set; } = null!;

        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; } = null!;

         [Required]
        public DateTime Data { get; set; }
    }
}
