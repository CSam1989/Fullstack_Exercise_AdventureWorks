﻿using System;
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
        public async Task<ActionResult<CustomerVM>> Get()
        {
            return await Mediator.Send(new GetCustomerQuery());
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, UpdateCustomerCommand command)
        {
            if (id != command.CustomerId)
                return BadRequest();

            await Mediator.Send(command);

            return NoContent();
        }
    }
}