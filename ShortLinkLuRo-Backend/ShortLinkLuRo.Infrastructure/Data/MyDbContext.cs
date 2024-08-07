using Microsoft.EntityFrameworkCore;
using ShortLinkLuRo.Domain.Models;


namespace ShortLinkLuRo.Infrastructure.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
        }
        public DbSet<ShortLink> ShortLinks { get; set; }

        public DbSet<User> Users { get; set; }
    }
}
