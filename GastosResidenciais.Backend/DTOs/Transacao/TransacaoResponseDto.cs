using GastosResidenciais.Backend.Domain.Enums;

namespace GastosResidenciais.Backend.DTOs.Transacao
{
    public class TransacaoResponseDto
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public int Tipo { get; set; }

        public CategoriaResumoDto Categoria { get; set; } = null!;
        public PessoaResumoDto Pessoa { get; set; } = null!;

        public DateTime Data { get; set;}
    }

    public class CategoriaResumoDto
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
    }

    public class PessoaResumoDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;

        public int Idade { get; set; }
    }
    
}

