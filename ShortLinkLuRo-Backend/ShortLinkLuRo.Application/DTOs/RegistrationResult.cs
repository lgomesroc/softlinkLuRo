namespace ShortLinkLuRo.Application.DTOs
{
    public class RegistrationResult
    {
        public bool Succeeded { get; set; }
        public IEnumerable<string>? Errors { get; set; }
    }
}

