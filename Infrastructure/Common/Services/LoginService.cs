using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Interfaces.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Common.Services
{
    public class LoginService : ILoginService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;

        public LoginService(UserManager<IdentityUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<string> LoginAndGetToken(string username)
        {
            var appUser = await _userManager.Users.SingleOrDefaultAsync(a => a.UserName == username);
            var roles = await GetUserRole(appUser.Id);
            return GenerateJwtToken(appUser,
                roles.FirstOrDefault() ?? "User"); //Authenticated zonder role (null) = een gewone user
        }

        private string GenerateJwtToken(IdentityUser user, string role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddHours(12),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII
                        .GetBytes(_configuration.GetSection("Token").Value)),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private async Task<IList<string>> GetUserRole(string userId)
        {
            var user = await _userManager.Users.FirstAsync(u => u.Id == userId);

            return await _userManager.GetRolesAsync(user);
        }
    }
}
