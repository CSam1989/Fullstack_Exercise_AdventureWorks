using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Data
{
    public static class DbInitializer
    {
        public static async Task SeedAdmin(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();
            var context = serviceProvider.GetRequiredService<AppDbContext>();

            await context.Database.EnsureCreatedAsync();

            if (await userManager.FindByNameAsync(Admin.Name) != null)
                return; //Als admin bestaat, dan moet de db niet geseed worden

            var user = new IdentityUser()
            {
                UserName = Admin.Name,
                Email = Admin.Email,
            };

            var result = await userManager.CreateAsync(user, Admin.Password);

            if (!result.Succeeded)
                return;

            Console.WriteLine("Something went wrong with seeding admin");

        }

        public static async Task SeedAdminRole(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var context = serviceProvider.GetRequiredService<AppDbContext>();

            //Admin Rol Toevoegen
            var roleCheck = await roleManager.RoleExistsAsync(Admin.Role);
            if (!roleCheck)
                await roleManager.CreateAsync(new IdentityRole(Admin.Role));

            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == Admin.Email);

            if (user == null)
                return;

            var roles = context.UserRoles;
            var adminRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == Admin.Role);

            if (adminRole == null)
                return;

            if (await roles.AnyAsync(ur => ur.UserId == user.Id && ur.RoleId == adminRole.Id))
                return;

            roles.Add(new IdentityUserRole<string> { UserId = user.Id, RoleId = adminRole.Id });
            await context.SaveChangesAsync();
        }
    }
}
