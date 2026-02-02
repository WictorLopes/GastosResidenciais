using GastosResidenciais.Backend.DTOs.Pessoa;
using GastosResidenciais.Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Backend.Controllers
{
    /// <summary>
    /// Controller responsável pelo gerenciamento de pessoas.
    /// </summary>
    [ApiController]
    [Route("api/pessoas")]
    public class PessoasController : ControllerBase
    {
        private readonly PessoaService _service;

        public PessoasController(PessoaService service)
        {
            _service = service;
        }

        /// <summary>
        /// Cria uma nova pessoa.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Criar([FromBody] CreatePessoaDto dto)
        {
            var pessoa = await _service.CriarAsync(dto);
            return CreatedAtAction(nameof(Listar), new { id = pessoa.Id }, pessoa);
        }

        /// <summary>
        /// Lista todas as pessoas.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            return Ok(await _service.ListarAsync());
        }

        /// <summary>
        /// Atualiza uma pessoa existente.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, UpdatePessoaDto dto)
        {
            var sucesso = await _service.AtualizarAsync(id, dto);
            if (!sucesso)
                return NotFound();

            return NoContent();
        }

        /// <summary>
        /// Remove uma pessoa do sistema.
        /// As transações associadas são removidas em cascata.
        /// </summary>
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
