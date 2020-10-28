using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Identity.Queries.GetListUsers
{
    public class UsersVm
    {
        public IEnumerable<UserDto> Users { get; set; }
    }
}
