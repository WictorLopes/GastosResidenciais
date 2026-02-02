using System.ComponentModel.DataAnnotations;
using GastosResidenciais.Backend.Domain.Enums;

namespace GastosResidenciais.Backend.DTOs.Categoria
{
    /// <summary>
    /// DTO usado para criação de categorias.
    /// </summary>
    public class CreateCategoriaDto
    {
        [Required]
        [MaxLength(400)]
        public string Descricao { get; set; } = string.Empty;

        /// <summary>
        /// Define se a categoria é de despesa, receita ou ambas.
        /// </summary>
        [Required]
        public FinalidadeCategoria Finalidade { get; set; }
    }

    /// <summary>
    /// DTO usado para atualização de categorias.
    /// </summary>
    public class UpdateCategoriaDto
    {
        [Required]
        [MaxLength(400)]
        public string Descricao { get; set; } = string.Empty;

        /// <summary>
        /// Define se a categoria é de despesa ou receita.
        /// </summary>
        [Required]
        public FinalidadeCategoria Finalidade { get; set; }
    }
}
