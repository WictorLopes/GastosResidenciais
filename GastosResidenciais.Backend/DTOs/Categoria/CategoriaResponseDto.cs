using GastosResidenciais.Backend.Domain.Enums;

namespace GastosResidenciais.Backend.DTOs.Categoria
{
    /// <summary>
    /// DTO de retorno da API.
    /// </summary>
    public class CategoriaResponseDto
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public FinalidadeCategoria Finalidade { get; set; }
    }
}
