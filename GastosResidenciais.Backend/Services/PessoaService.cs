using GastosResidenciais.Backend.DTOs.Pessoa;
using GastosResidenciais.Backend.Domain.Entities;
using GastosResidenciais.Backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Backend.Services
{
    /// Serviço responsável pelas regras de negócio de Pessoa.
    public class PessoaService
    {
        private readonly AppDbContext _context;

        public PessoaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PessoaResponseDto> CriarAsync(CreatePessoaDto dto)
        {
            var pessoa = new Pessoa { Nome = dto.Nome, Idade = dto.Idade };

            _context.Pessoas.Add (pessoa);
            await _context.SaveChangesAsync();

            return new PessoaResponseDto {
                Id = pessoa.Id,
                Nome = pessoa.Nome,
                Idade = pessoa.Idade
            };
        }

        public async Task<List<PessoaResponseDto>> ListarAsync()
        {
            return await _context
                .Pessoas
                .Select(p =>
                    new PessoaResponseDto {
                        Id = p.Id,
                        Nome = p.Nome,
                        Idade = p.Idade
                    })
                .ToListAsync();
        }

        public async Task<bool> AtualizarAsync(int id, UpdatePessoaDto dto)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);
            if (pessoa == null) return false;

            pessoa.Nome = dto.Nome;
            pessoa.Idade = dto.Idade;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeletarAsync(int id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);
            if (pessoa == null) return false;

            _context.Pessoas.Remove (pessoa);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
