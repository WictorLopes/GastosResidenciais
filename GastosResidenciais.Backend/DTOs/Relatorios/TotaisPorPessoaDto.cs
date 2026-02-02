namespace GastosResidenciais.Backend.DTOs.Relatorios
{
    /// <summary>
    /// DTO que representa os totais financeiros de uma pessoa.
    /// </summary>
    public class TotaisPorPessoaDto
    {
        public int PessoaId { get; set; }
        public string Pessoa { get; set; } = string.Empty;

        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }

        /// <summary>
        /// Saldo = Receitas - Despesas
        /// </summary>
        public decimal Saldo => TotalReceitas - TotalDespesas;
    }
}
