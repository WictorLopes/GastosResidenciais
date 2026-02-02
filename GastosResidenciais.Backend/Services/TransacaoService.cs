using GastosResidenciais.Backend.Domain.Entities;
using GastosResidenciais.Backend.Domain.Enums;
using GastosResidenciais.Backend.DTOs.Transacao;
using GastosResidenciais.Backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Backend.Services
{
    /// <summary>
    /// Serviço responsável pelas regras de negócio das transações.
    /// </summary>
    public class TransacaoService
    {
        private readonly AppDbContext _context;

        public TransacaoService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Cria uma nova transação aplicando todas as regras do sistema.
        /// </summary>
        public async Task<TransacaoResponseDto> CriarAsync(CreateTransacaoDto dto)
        {
            var pessoa = await _context.Pessoas.FindAsync(dto.PessoaId)
                ?? throw new Exception("Pessoa não encontrada.");

            var categoria = await _context.Categorias.FindAsync(dto.CategoriaId)
                ?? throw new Exception("Categoria não encontrada.");

            // REGRA 1: Menor de idade não pode ter receita
            if (pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita)
                throw new Exception("Pessoa menor de idade não pode registrar receitas.");

            // REGRA 2: Categoria incompatível
            if (dto.Tipo == TipoTransacao.Despesa &&
                categoria.Finalidade == FinalidadeCategoria.Receita)
                throw new Exception("Categoria incompatível com transação de despesa.");

            if (dto.Tipo == TipoTransacao.Receita &&
                categoria.Finalidade == FinalidadeCategoria.Despesa)
                throw new Exception("Categoria incompatível com transação de receita.");

            var transacao = new Transacao
            {
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Tipo = dto.Tipo,
                PessoaId = dto.PessoaId,
                CategoriaId = dto.CategoriaId,
                Data = dto.Data
            };

            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();

            // Carrega navegações para retorno
            await _context.Entry(transacao).Reference(t => t.Pessoa).LoadAsync();
            await _context.Entry(transacao).Reference(t => t.Categoria).LoadAsync();

            return new TransacaoResponseDto
            {
                Id = transacao.Id,
                Descricao = transacao.Descricao,
                Valor = transacao.Valor,
                Tipo = (int)transacao.Tipo,
                Data = transacao.Data,
                Categoria = new CategoriaResumoDto
                {
                    Id = transacao.Categoria.Id,
                    Descricao = transacao.Categoria.Descricao
                },
                Pessoa = new PessoaResumoDto
                {
                    Id = transacao.Pessoa.Id,
                    Nome = transacao.Pessoa.Nome,
                    Idade = transacao.Pessoa.Idade
                }
            };
        }

        /// <summary>
        /// Lista todas as transações cadastradas.
        /// </summary>
        public async Task<List<TransacaoResponseDto>> ListarAsync()
        {
            return await _context.Transacoes
                .Include(t => t.Pessoa)
                .Include(t => t.Categoria)
                .Select(t => new TransacaoResponseDto
                {
                    Id = t.Id,
                    Descricao = t.Descricao,
                    Valor = t.Valor,
                    Tipo = (int)t.Tipo,
                    Data = t.Data,
                    Categoria = new CategoriaResumoDto
                    {
                        Id = t.Categoria.Id,
                        Descricao = t.Categoria.Descricao
                    },
                    Pessoa = new PessoaResumoDto
                    {
                        Id = t.Pessoa.Id,
                        Nome = t.Pessoa.Nome,
                        Idade = t.Pessoa.Idade
                    }
                })
                .ToListAsync();
        }
        /// <summary>
        /// Atualiza uma transação existente.
        /// </summary>
        public async Task<Transacao> AtualizarAsync(int id, UpdateTransacaoDto dto)
        {
            var transacao = await _context.Transacoes.FindAsync(id);
            if (transacao == null)
                throw new KeyNotFoundException();

            transacao.Descricao = dto.Descricao;
            transacao.Valor = dto.Valor;
            transacao.Tipo = dto.Tipo;
            transacao.CategoriaId = dto.CategoriaId;
            transacao.PessoaId = dto.PessoaId;
            transacao.Data = dto.Data;

            _context.Transacoes.Update(transacao);
            await _context.SaveChangesAsync();

            return transacao;
        }

        /// <summary>
        /// Exclui uma transação existente.
        /// </summary>
        public async Task ExcluirAsync(int id)
        {
            var transacao = await _context.Transacoes.FindAsync(id);
            if (transacao == null)
                throw new KeyNotFoundException();

            _context.Transacoes.Remove(transacao);
            await _context.SaveChangesAsync();
        }
    }
    
}
