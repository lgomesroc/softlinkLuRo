namespace ShortLinkLuRo.Domain.Models
{
    public class ShortLink
    {
        public string? Id { get; set; } // Chave primária
        public string? OriginalUrl { get; set; }
        public string? ShortCode { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

