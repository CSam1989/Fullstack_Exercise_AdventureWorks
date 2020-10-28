using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity.Commands.UpdateRole
{
    public class UpdateRoleCommand: IRequest
    {
        public string UserId { get; set; }
        public bool IsAdmin { get; set; }

        public class UpdateRoleCommandHandler : IRequestHandler<UpdateRoleCommand>
        {
            private readonly IRoleService _roleService;

            public UpdateRoleCommandHandler(IRoleService roleService)
            {
                _roleService = roleService;
            }

            public async Task<Unit> Handle(UpdateRoleCommand request, CancellationToken cancellationToken)
            {
                await _roleService.SetAdminRole(request.UserId, request.IsAdmin);

                return Unit.Value;
            }
        }
    }
}
