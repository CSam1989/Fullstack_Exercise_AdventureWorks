using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Interfaces.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity.Commands.CreateAccount
{
    public class CreateAccountCommand : IRequest<string>
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public bool IsAdmin { get; set; }

        public class CreateAccountCommandHandler : IRequestHandler<CreateAccountCommand, string>
        {
            private readonly UserManager<IdentityUser> _userManager;
            private readonly IRoleService _roleService;

            public CreateAccountCommandHandler(
                UserManager<IdentityUser> userManager,
                IRoleService roleService
            )
            {
                _userManager = userManager;
                _roleService = roleService;
            }

            public async Task<string> Handle(CreateAccountCommand request, CancellationToken cancellationToken)
            {
                //Cant be run in pipeline because asp validation pipeline doesnt run asynchronous
                if (await CheckIfEmailOrUsernameExists(request.Email, request.Username))
                    throw new BadRequestException("Username and/or email already exists");

                var user = new IdentityUser()
                {
                    Email = request.Email.Trim(),
                    UserName = request.Username.Trim()
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (!result.Succeeded)
                    throw new BadRequestException("Something went wrong with creating the account");

                if (request.IsAdmin)
                    await _roleService.SetAdminRole(user.Id, request.IsAdmin);

                return user.Id;
            }

            private async Task<bool> CheckIfEmailOrUsernameExists(string email, string username)
            {
                return await _userManager.FindByEmailAsync(email) != null ||
                       await _userManager.FindByNameAsync(username) != null;
            }
        }
    }
}
