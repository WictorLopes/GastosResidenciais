using System;
using System.ComponentModel.DataAnnotations;
using GastosResidenciais.Backend.Domain.Enums;

namespace GastosResidenciais.Backend.DTOs.Transacao
{
    /// <summary>
    /// DTO usado para criação de transações financeiras.
    /// </summary>
    public class CreateTransacaoDto
    {
        [Required]
        [MaxLength(400)]
        public string Descricao { get; set; } = string.Empty;

        /// <summary>
        /// Valor da transação. Deve ser sempre positivo.
        /// </summary>
        [Range(0.01, double.MaxValue)]
        public decimal Valor { get; set; }

        /// <summary>
        /// Define se é uma despesa ou receita.
        /// </summary>
        [Required]
        public TipoTransacao Tipo { get; set; }

        /// <summary>
        /// Identificador da categoria.
        /// </summary>
        [Required]
        public int CategoriaId { get; set; }

        /// <summary>
        /// Identificador da pessoa.
        /// </summary>
        [Required]
        public int PessoaId { get; set; }

        /// <summary>
        /// Data da transação.
        /// </summary>
        [Required]
        public DateTime Data { get; set; } = DateTime.UtcNow;
    }

    public class UpdateTransacaoDto
    {
        [Required]
        [MaxLength(400)]
        public string Descricao { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue)]
        public decimal Valor { get; set; }

        [Required]
        public TipoTransacao Tipo { get; set; }

        [Required]
        public int CategoriaId { get; set; }

        [Required]
        public int PessoaId { get; set; }

        [Required]
        public DateTime Data { get; set; }
    }
}
