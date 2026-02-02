namespace GastosResidenciais.Backend.DTOs.Relatorios
{
    /// DTO que representa os totais financeiros de uma pessoa.
    public class TotaisPorPessoaDto
    {
        public int PessoaId { get; set; }
        public string Pessoa { get; set; } = string.Empty;

        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }

        /// Saldo = Receitas - Despesas
        public decimal Saldo => TotalReceitas - TotalDespesas;
    }
}
