using GastosResidenciais.Backend.DTOs.Relatorios;
using GastosResidenciais.Backend.Domain.Enums;
using GastosResidenciais.Backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Backend.Services
{
    /// <summary>
    /// Serviço responsável pelas consultas e relatórios financeiros.
    /// </summary>
    public class RelatorioService
    {
        private readonly AppDbContext _context;

        public RelatorioService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Retorna os totais de receitas, despesas e saldo por pessoa,
        /// além do total geral do sistema.
        /// </summary>
        public async Task<TotaisGeraisDto> ObterTotaisPorPessoaAsync()
        {
            var pessoas =
                await _context.Pessoas.Include(p => p.Transacoes).ToListAsync();

            var resultado = new TotaisGeraisDto();

            foreach (var pessoa in pessoas)
            {
                var totalReceitas =
                    pessoa
                        .Transacoes
                        .Where(t => t.Tipo == TipoTransacao.Receita)
                        .Sum(t => t.Valor);

                var totalDespesas =
                    pessoa
                        .Transacoes
                        .Where(t => t.Tipo == TipoTransacao.Despesa)
                        .Sum(t => t.Valor);

                resultado
                    .Pessoas
                    .Add(new TotaisPorPessoaDto {
                        PessoaId = pessoa.Id,
                        Pessoa = pessoa.Nome,
                        TotalReceitas = totalReceitas,
                        TotalDespesas = totalDespesas
                    });

                resultado.TotalReceitas += totalReceitas;
                resultado.TotalDespesas += totalDespesas;
            }

            return resultado;
        }
    }
}
