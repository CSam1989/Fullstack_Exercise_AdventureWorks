using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces.Identity;
using Application.Common.Interfaces.Persistance;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Common.Services
{
    public class RoleService : IRoleService
    {
        private readonly UserManager<IdentityUser> _userManager;

        public RoleService( UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task SetAdminRole(string userId, bool shouldBeAdmin)
        {
            var user = await GetUser(userId);

            if (shouldBeAdmin)
                await _userManager.AddToRoleAsync(user, Admin.Role);
            else
                await _userManager.RemoveFromRoleAsync(user, Admin.Role);
        }

        private async Task<IdentityUser> GetUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user is null)
                throw new NotFoundException("User", userId);

            return user;
        }
    }
}
