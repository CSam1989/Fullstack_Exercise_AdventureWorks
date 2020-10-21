using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Infrastructure.Data;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Identity.Queries.GetListUsers
{
    public class GetListUsersQuery: IRequest<UsersVm>
    {
        public class GetListUsersQueryHandler : IRequestHandler<GetListUsersQuery, UsersVm>
        {
            private readonly UserManager<IdentityUser> _userManager;

            public GetListUsersQueryHandler(UserManager<IdentityUser> userManager)
            {
                _userManager = userManager;
            }

            public async Task<UsersVm> Handle(GetListUsersQuery request, CancellationToken cancellationToken)
            {
                var vm = new UsersVm();

                var users = await _userManager.Users.ToListAsync(cancellationToken);

                var userDtoList = new List<UserDto>();

                foreach (var user in users)
                {
                    userDtoList.Add(new UserDto()
                    {
                        UserId = user.Id,
                        Username = user.UserName,
                        Email = user.Email,
                        IsAdmin = await _userManager.IsInRoleAsync(user, Admin.Role)
                    });
                }

                vm.Users = userDtoList;
                return vm;
            }
        }
    }
}
