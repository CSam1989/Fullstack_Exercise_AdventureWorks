using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Identity.Queries.GetListUsers
{
    public class UserDto
    {
        public string UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
    }
}
