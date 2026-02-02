using GastosResidenciais.Backend.DTOs.Pessoa;
using GastosResidenciais.Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Backend.Controllers
{
    /// Controller responsável pelo gerenciamento de pessoas.
    [ApiController]
    [Route("api/pessoas")]
    public class PessoasController : ControllerBase
    {
        private readonly PessoaService _service;

        public PessoasController(PessoaService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Criar([FromBody] CreatePessoaDto dto)
        {
            var pessoa = await _service.CriarAsync(dto);
            return CreatedAtAction(nameof(Listar), new { id = pessoa.Id }, pessoa);
        }

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            return Ok(await _service.ListarAsync());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, UpdatePessoaDto dto)
        {
            var sucesso = await _service.AtualizarAsync(id, dto);
            if (!sucesso)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletar(int id)
        {
            var sucesso = await _service.DeletarAsync(id);
            if (!sucesso)
                return NotFound();

            return NoContent();
        }
    }
}
