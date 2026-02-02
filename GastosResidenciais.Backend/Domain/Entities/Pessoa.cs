using System.ComponentModel.DataAnnotations;

namespace GastosResidenciais.Backend.Domain.Entities
{
    public class Pessoa
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Nome { get; set; } = string.Empty;

        public int Idade { get; set; }

        public ICollection<Transacao> Transacoes
        { get; set;
        } = new List<Transacao>();
    }
}
