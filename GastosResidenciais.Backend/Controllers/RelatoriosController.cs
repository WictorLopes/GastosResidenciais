using GastosResidenciais.Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Backend.Controllers
{
    /// <summary>
    /// Controller responsável pelas consultas de totais e relatórios.
    /// </summary>
    [ApiController]
    [Route("api/relatorios")]
    public class RelatoriosController : ControllerBase
    {
        private readonly RelatorioService _service;

        public RelatoriosController(RelatorioService service)
        {
            _service = service;
        }

        /// <summary>
        /// Consulta os totais de receitas, despesas e saldo por pessoa,
        /// incluindo o total geral do sistema.
        /// </summary>
        [HttpGet("totais-por-pessoa")]
        public async Task<IActionResult> TotaisPorPessoa()
        {
            var resultado = await _service.ObterTotaisPorPessoaAsync();
            return Ok(resultado);
        }
    }
}
