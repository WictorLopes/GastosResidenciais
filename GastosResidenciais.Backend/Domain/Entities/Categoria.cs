using System.ComponentModel.DataAnnotations;
using GastosResidenciais.Backend.Domain.Enums;

namespace GastosResidenciais.Backend.Domain.Entities
{
    /// <summary>
    /// Representa uma categoria de transação.
    /// </summary>
    public class Categoria
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(400)]
        public string Descricao { get; set; } = string.Empty;

        /// <summary>
        /// Define se a categoria pode ser usada para despesa, receita ou ambas.
        /// </summary>
        public FinalidadeCategoria Finalidade { get; set; }
    }
}
