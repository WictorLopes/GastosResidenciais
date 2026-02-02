using GastosResidenciais.Backend.DTOs.Transacao;
using GastosResidenciais.Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Backend.Controllers
{
    /// <summary>
    /// Controller responsável pelo gerenciamento de transações.
    /// </summary>
    [ApiController]
    [Route("api/transacoes")]
    public class TransacoesController : ControllerBase
    {
        private readonly TransacaoService _service;

        public TransacoesController(TransacaoService service)
        {
            _service = service;
        }

        /// <summary>
        /// Cria uma nova transação.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult>
        Criar([FromBody] CreateTransacaoDto dto)
        {
            try
            {
                var transacao = await _service.CriarAsync(dto);
                return Created("", transacao);
            }
            catch (Exception ex)
            {
                // Retorna erro de regra de negócio de forma clara
                return BadRequest(new { erro = ex.Message });
            }
        }

        /// <summary>
        /// Lista todas as transações.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            return Ok(await _service.ListarAsync());
        }

        /// <summary>
        /// Atualiza uma transação existente.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult>
        Atualizar(int id, [FromBody] UpdateTransacaoDto dto)
        {
            try
            {
                var transacao = await _service.AtualizarAsync(id, dto);
                return Ok(transacao);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { erro = "Transação não encontrada." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { erro = ex.Message });
            }
        }

        /// <summary>
        /// Exclui uma transação existente.
        /// </summary>
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
                return NotFound(new { erro = "Transação não encontrada." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { erro = ex.Message });
            }
        }
    }
}
