using System.Collections.Generic;

namespace GastosResidenciais.Backend.DTOs.Relatorios
{
    /// <summary>
    /// DTO que representa o resumo geral do sistema.
    /// </summary>
    public class TotaisGeraisDto
    {
        public List<TotaisPorPessoaDto> Pessoas { get; set; } = new();

        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal SaldoGeral => TotalReceitas - TotalDespesas;
    }
}
