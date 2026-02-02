using GastosResidenciais.Backend.DTOs.Categoria;
using GastosResidenciais.Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Backend.Controllers
{
    [ApiController]
    [Route("api/categorias")]
    public class CategoriasController : ControllerBase
    {
        private readonly CategoriaService _service;

        public CategoriasController(CategoriaService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Criar([FromBody] CreateCategoriaDto dto)
        {
            var categoria = await _service.CriarAsync(dto);
            return CreatedAtAction(nameof(Listar), new { id = categoria.Id }, categoria);
        }

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            return Ok(await _service.ListarAsync());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, [FromBody] UpdateCategoriaDto dto)
        {
            try
            {
                var categoria = await _service.AtualizarAsync(id, dto);
                return Ok(categoria);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { erro = "Categoria não encontrada." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { erro = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Excluir(int id)
        {
            try
            {
                await _service.ExcluirAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { erro = "Categoria não encontrada." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { erro = ex.Message });
            }
        }
    }
}
