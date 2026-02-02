using System.ComponentModel.DataAnnotations;
using GastosResidenciais.Backend.Domain.Enums;

namespace GastosResidenciais.Backend.DTOs.Categoria
{
    /// DTO usado para criação de categorias.
    public class CreateCategoriaDto
    {
        [Required]
        [MaxLength(400)]
        public string Descricao { get; set; } = string.Empty;


        [Required]
        public FinalidadeCategoria Finalidade { get; set; }
    }


    public class UpdateCategoriaDto
    {
        [Required]
        [MaxLength(400)]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public FinalidadeCategoria Finalidade { get; set; }
    }
}
