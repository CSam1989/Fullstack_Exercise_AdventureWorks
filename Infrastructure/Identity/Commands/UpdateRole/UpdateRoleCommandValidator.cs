using System;
using System.Collections.Generic;
using System.Text;
using Application.Common.Interfaces.Identity;
using FluentValidation;

namespace Infrastructure.Identity.Commands.UpdateRole
{
    public class UpdateRoleCommandValidator: AbstractValidator<UpdateRoleCommand>
    {
        private readonly ICurrentUserService _currentUser;

        public UpdateRoleCommandValidator(ICurrentUserService currentUser)
        {
            _currentUser = currentUser;
            RuleFor(u => u)
                .Must(u => !MatchCurrentUser(u))
                .WithMessage("Can't update your own data");
        }

        private bool MatchCurrentUser(UpdateRoleCommand u)
        {
            return u.UserId == _currentUser.UserId;
        }
    }
}
