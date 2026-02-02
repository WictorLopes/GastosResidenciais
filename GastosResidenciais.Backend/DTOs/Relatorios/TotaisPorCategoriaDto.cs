namespace GastosResidenciais.Backend.DTOs.Relatorios
{
    /// DTO que representa os totais financeiros de uma categoria.
    public class TotaisPorCategoriaDto
    {
        public int CategoriaId { get; set; }
        public string Categoria { get; set; } = string.Empty;

        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }

        public decimal Saldo => TotalReceitas - TotalDespesas;
    }
}
