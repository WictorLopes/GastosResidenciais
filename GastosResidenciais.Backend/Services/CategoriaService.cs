using GastosResidenciais.Backend.DTOs.Categoria;
using GastosResidenciais.Backend.Domain.Entities;
using GastosResidenciais.Backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Backend.Services
{
    /// Serviço responsável pelas regras de negócio de Categoria.
    public class CategoriaService
    {
        private readonly AppDbContext _context;

        public CategoriaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CategoriaResponseDto>
        CriarAsync(CreateCategoriaDto dto)
        {
            var categoria =
                new Categoria {
                    Descricao = dto.Descricao,
                    Finalidade = dto.Finalidade
                };

            _context.Categorias.Add (categoria);
            await _context.SaveChangesAsync();

            return new CategoriaResponseDto {
                Id = categoria.Id,
                Descricao = categoria.Descricao,
                Finalidade = categoria.Finalidade
            };
        }

        public async Task<List<CategoriaResponseDto>> ListarAsync()
        {
            return await _context
                .Categorias
                .Select(c =>
                    new CategoriaResponseDto {
                        Id = c.Id,
                        Descricao = c.Descricao,
                        Finalidade = c.Finalidade
                    })
                .ToListAsync();
        }

        public async Task<CategoriaResponseDto>
        AtualizarAsync(int id, UpdateCategoriaDto dto)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria == null) throw new KeyNotFoundException();

            categoria.Descricao = dto.Descricao;
            categoria.Finalidade = dto.Finalidade;

            _context.Categorias.Update (categoria);
            await _context.SaveChangesAsync();

            return new CategoriaResponseDto {
                Id = categoria.Id,
                Descricao = categoria.Descricao,
                Finalidade = categoria.Finalidade
            };
        }

        public async Task ExcluirAsync(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria == null) throw new KeyNotFoundException();

            _context.Categorias.Remove (categoria);
            await _context.SaveChangesAsync();
        }
    }
}
