using System.ComponentModel.DataAnnotations;

namespace GastosResidenciais.Backend.DTOs.Pessoa
{
    /// DTO usado para atualização de uma pessoa.
    public class UpdatePessoaDto
    {
        [Required(ErrorMessage = "O nome é obrigatório.")]
        [MaxLength(200)]
        public string Nome { get; set; } = string.Empty;

        [Range(0, 130, ErrorMessage = "Idade inválida.")]
        public int Idade { get; set; }
    }
}
