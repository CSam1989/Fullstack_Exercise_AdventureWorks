using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Customers.Commands.Update;
using Application.Customers.Queries.Get;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CustomerController : BaseController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CustomerVM>> Get()
        {
            return  Ok(await Mediator.Send(new GetCustomerQuery()));
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Update(int id, UpdateCustomerCommand command)
        {
            if (id != command.CustomerId)
                return BadRequest();

            await Mediator.Send(command);

            return NoContent();
        }
    }
}