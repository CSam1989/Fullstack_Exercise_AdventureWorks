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

namespace Infrastructure.Identity.Queries.Login
{
    public class LoginQuery : IRequest<string>
    {
        public string Username { get; set; }
        public string Password { get; set; }

        public class LoginQueryHandler : IRequestHandler<LoginQuery, string>
        {
            private readonly ILoginService _loginService;
            private readonly SignInManager<IdentityUser> _signInManager;

            public LoginQueryHandler(
                SignInManager<IdentityUser> signInManager,
                ILoginService loginService
            )
            {
                _signInManager = signInManager;
                _loginService = loginService;
            }

            public async Task<string> Handle(LoginQuery request, CancellationToken cancellationToken)
            {
                var result =
                    await _signInManager.PasswordSignInAsync(request.Username, request.Password, false, false);

                if (!result.Succeeded)
                    throw new UnauthorizedException("Username and/or Password are not correct!");

                return await _loginService.LoginAndGetToken(request.Username);
            }
        }
    }
}
