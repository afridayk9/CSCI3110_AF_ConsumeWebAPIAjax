using System.ComponentModel.DataAnnotations;

namespace CSCI3110_AF_ConsumeWebAPIAjax.Models;

public class Book
{
    public int Id { get; set; }
    [Required]
    public string Title { get; set; } = String.Empty;
    public int? Edition { get; set; }
    public int PublicationYear { get; set; }
}
