using ShortLinkLuRo.Domain.Models;
using ShortLinkLuRo.Infrastructure.Data;


namespace ShortLinkLuRo.Application.Services
{
    public class LinkService
    {
        private readonly MyDbContext _context;

        public LinkService(MyDbContext context)
        {
            _context = context;
        }

        public ShortLink CreateShortLink(string originalUrl)
        {
            var shortCode = Guid.NewGuid().ToString().Substring(0, 8);

            var newLink = new ShortLink
            {
                OriginalUrl = originalUrl,
                ShortCode = shortCode,
                CreatedAt = DateTime.UtcNow
            };

            _context.ShortLinks.Add(newLink);
            _context.SaveChanges();

            return newLink;
        }

        public ShortLink GetShortLinkByCode(string shortCode)
        {
            return _context.ShortLinks.SingleOrDefault(link => link.ShortCode == shortCode);
        }

        public List<ShortLink> GetAllLinks()
        {
            return _context.ShortLinks.ToList();
        }

        public bool DeleteLink(string shortCode)
        {
            var link = _context.ShortLinks.SingleOrDefault(l => l.ShortCode == shortCode);
            if (link == null) return false;

            _context.ShortLinks.Remove(link);
            _context.SaveChanges();
            return true;
        }
    }
}

