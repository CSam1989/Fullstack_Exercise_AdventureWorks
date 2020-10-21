using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Identity.Commands.CreateAccount;
using Infrastructure.Identity.Commands.UpdateRole;
using Infrastructure.Identity.Queries.GetListUsers;
using Infrastructure.Identity.Queries.Login;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AuthController : BaseController
    {

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<UsersVm>> GetUsers()
        {
            return Ok(await Mediator.Send(new GetListUsersQuery()));
        }

        [HttpPost("login")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<object>> Login(LoginQuery query)
        {
            var token = await Mediator.Send(query);

            return Ok(new
            {
                token
            });
        }

        [HttpPost("create")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> CreateUser(CreateAccountCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        [HttpPut("updaterole")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateRole(UpdateRoleCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }
    }
}