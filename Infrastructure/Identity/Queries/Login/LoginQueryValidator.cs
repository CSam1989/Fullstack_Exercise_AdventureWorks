using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;

namespace Infrastructure.Identity.Queries.Login
{
    public class LoginQueryValidator : AbstractValidator<LoginQuery>
    {
        public LoginQueryValidator()
        {
            RuleFor(l => l.Username)
                .NotEmpty().WithMessage("Username is required");

            RuleFor(l => l.Password)
                .NotEmpty().WithMessage("Password is required");
        }
    }
}
