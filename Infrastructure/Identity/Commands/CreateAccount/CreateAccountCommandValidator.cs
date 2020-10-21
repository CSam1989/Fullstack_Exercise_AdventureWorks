using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;

namespace Infrastructure.Identity.Commands.CreateAccount
{
    public class CreateAccountCommandValidator: AbstractValidator<CreateAccountCommand>
    {
        public CreateAccountCommandValidator()
        {
            RuleFor(r => r.Username)
                .NotEmpty().WithMessage("Username is required")
                .MaximumLength(20).WithMessage("Username max 20 characters");

            RuleFor(r => r.Email)
                .NotEmpty().WithMessage("Email is required")
                .Matches(@"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$")
                .WithMessage("Email is not valid");

            RuleFor(r => r.Password)
                .NotEmpty().WithMessage("Password is required")
                .MinimumLength(8).WithMessage("Password minimum 8 characters")
                .MaximumLength(100).WithMessage("Password max 100 characters")
                .Matches(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,100}$")
                .WithMessage("Password must have at least 1 lowercase, 1 uppercase, 1 number en 1 special character");

        }
    }
}
