using System.ComponentModel.DataAnnotations;

namespace GastosResidenciais.Backend.DTOs.Pessoa
{
    /// DTO usado para criação de uma pessoa.
    public class CreatePessoaDto
    {
        [Required]
        [MaxLength(200)]
        public string Nome { get; set; } = string.Empty;

        [Required]
        [Range(0, 150)]
        public int Idade { get; set; }
    }
}
