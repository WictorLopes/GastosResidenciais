using GastosResidenciais.Backend.DTOs.Transacao;
using GastosResidenciais.Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Backend.Controllers
{
    /// Controller responsável pelo gerenciamento de transações.
    [ApiController]
    [Route("api/transacoes")]
    public class TransacoesController : ControllerBase
    {
        private readonly TransacaoService _service;

        public TransacoesController(TransacaoService service)
        {
            _service = service;
        }

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
                return BadRequest(new { erro = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            return Ok(await _service.ListarAsync());
        }

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
