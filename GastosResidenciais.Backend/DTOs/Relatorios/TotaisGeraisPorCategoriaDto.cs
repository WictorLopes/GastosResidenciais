namespace GastosResidenciais.Backend.DTOs.Relatorios
{
    public class TotaisGeraisPorCategoriaDto
    {
        public List<TotaisPorCategoriaDto> Categorias { get; set; } = new();

        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }

        public decimal SaldoGeral => TotalReceitas - TotalDespesas;
    }
}
