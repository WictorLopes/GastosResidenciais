namespace GastosResidenciais.Backend.DTOs.Pessoa
{
    /// <summary>
    /// DTO de retorno da API.
    /// </summary>
    public class PessoaResponseDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public int Idade { get; set; }
    }
}
