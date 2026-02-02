using System;
using System.ComponentModel.DataAnnotations;
using GastosResidenciais.Backend.Domain.Enums;

namespace GastosResidenciais.Backend.DTOs.Transacao
{
    /// DTO usado para criação de transações financeiras.
    public class CreateTransacaoDto
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
