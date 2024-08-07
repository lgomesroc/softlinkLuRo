using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using ShortLinkLuRo.Application.DTOs;
using ShortLinkLuRo.Domain.Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ShortLinkLuRo.Application.Services
{
    public class AuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<string?> LoginAsync(UserLoginDTO loginDto)
        {
            // Encontrar o usuário com base no e-mail
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                return null; // Usuário não encontrado
            }

            // Verificar a senha do usuário
            var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!isPasswordValid)
            {
                return null; // Senha inválida
            }

            // Gerar o token JWT
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

        public async Task<RegistrationResult> RegisterAsync(UserRegisterDTO registerDto)
        {
            var user = new User
            {
                UserName = registerDto.Email,
                Email = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            var registrationResult = new RegistrationResult
            {
                Succeeded = result.Succeeded,
                Errors = result.Errors.Select(e => e.Description)
            };

            return registrationResult;
        }
    }
}
