using System.ComponentModel.DataAnnotations;

namespace GastosResidenciais.Backend.DTOs.Pessoa
{
    /// <summary>
    /// DTO usado para atualização de uma pessoa.
    /// </summary>
    public class UpdatePessoaDto
    {
        [Required(ErrorMessage = "O nome é obrigatório.")]
        [MaxLength(200)]
        public string Nome { get; set; } = string.Empty;

        [Range(0, 130, ErrorMessage = "Idade inválida.")]
        public int Idade { get; set; }
    }
}
