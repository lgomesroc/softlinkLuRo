using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ShortLinkLuRo.Domain.Models

{
    public class User : IdentityUser<string>
    {
        public string? Id { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? UserName { get; set; }

    }

}
