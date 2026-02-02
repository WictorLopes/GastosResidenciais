using System.ComponentModel.DataAnnotations;
using GastosResidenciais.Backend.Domain.Enums;

namespace GastosResidenciais.Backend.Domain.Entities
{

    public class Categoria
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(400)]
        public string Descricao { get; set; } = string.Empty;

        public FinalidadeCategoria Finalidade { get; set; }

        public ICollection<Transacao> Transacoes
        { get; set;
        } = new List<Transacao>();
    }
}
