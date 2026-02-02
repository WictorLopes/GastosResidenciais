namespace GastosResidenciais.Backend.DTOs.Pessoa
{
    /// DTO de retorno da API.
    public class PessoaResponseDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public int Idade { get; set; }
    }
}
