using GastosResidenciais.Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Backend.Controllers
{
    /// Controller responsável pelas consultas de totais e relatórios.
    [ApiController]
    [Route("api/relatorios")]
    public class RelatoriosController : ControllerBase
    {
        private readonly RelatorioService _service;

        public RelatoriosController(RelatorioService service)
        {
            _service = service;
        }

        [HttpGet("totais-por-pessoa")]
        public async Task<IActionResult> TotaisPorPessoa()
        {
            return Ok(await _service.ObterTotaisPorPessoaAsync());
        }

        [HttpGet("totais-por-categoria")]
        public async Task<IActionResult> TotaisPorCategoria()
        {
            return Ok(await _service.ObterTotaisPorCategoriaAsync());
        }
    }
}
