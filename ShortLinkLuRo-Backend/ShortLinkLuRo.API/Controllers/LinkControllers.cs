using Microsoft.AspNetCore.Mvc;
using ShortLinkLuRo.Application.Services;
using ShortLinkLuRo.Application.DTOs;
using ShortLinkLuRo.Domain.Models;
using System.Linq;

namespace ShortLinkLuRo.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LinkController : ControllerBase
    {
        private readonly LinkService _linkService;

        public LinkController(LinkService linkService)
        {
            _linkService = linkService;
        }

        [HttpPost("shorten")]
        public IActionResult ShortenLink([FromBody] string originalUrl)
        {
            if (string.IsNullOrEmpty(originalUrl))
                return BadRequest("URL cannot be null or empty.");

            var newLink = _linkService.CreateShortLink(originalUrl);

            var shortLinkDto = new ShortLinkDTO
            {
                OriginalUrl = newLink.OriginalUrl,
                ShortCode = newLink.ShortCode,
                CreatedAt = newLink.CreatedAt
            };

            return Ok(shortLinkDto);
        }

        [HttpGet("{shortCode}")]
        public IActionResult GetOriginalUrl(string shortCode)
        {
            var link = _linkService.GetShortLinkByCode(shortCode);
            if (link == null)
                return NotFound("Short URL not found.");

            return Redirect(link.OriginalUrl);
        }

        [HttpGet("all")]
        public IActionResult GetAllLinks()
        {
            var links = _linkService.GetAllLinks();
            var linkDtos = links.Select(link => new ShortLinkDTO
            {
                OriginalUrl = link.OriginalUrl,
                ShortCode = link.ShortCode,
                CreatedAt = link.CreatedAt
            }).ToList();

            return Ok(linkDtos);
        }

        [HttpDelete("{shortCode}")]
        public IActionResult DeleteLink(string shortCode)
        {
            var result = _linkService.DeleteLink(shortCode);
            if (!result)
                return NotFound("Short URL not found.");

            return NoContent();
        }
    }
}
