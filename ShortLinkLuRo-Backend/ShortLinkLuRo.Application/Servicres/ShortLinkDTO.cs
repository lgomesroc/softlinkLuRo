namespace ShortLinkLuRo.Application.DTOs
{
    public class ShortLinkDTO
    {
        public string? OriginalUrl { get; set; }
        public string? ShortCode { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

