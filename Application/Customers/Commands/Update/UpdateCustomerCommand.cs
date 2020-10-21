using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customers.Commands.Update
{
    public class UpdateCustomerCommand : IRequest
    {
        public int CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public class UpdateCustomerCommandHandler : IRequestHandler<UpdateCustomerCommand>
        {
            private readonly IAppDbContext _context;

            public UpdateCustomerCommandHandler(IAppDbContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(UpdateCustomerCommand request, CancellationToken cancellationToken)
            {
                var person = await _context.Person
                    .Include(c => c.Customers)
                    .FirstOrDefaultAsync(p => 
                        p.Customers.Any(c => c.CustomerId == request.CustomerId), cancellationToken);

                if(person is null)
                    throw new NotFoundException(nameof(Customer), request.CustomerId);

                person.FirstName = request.FirstName.Trim();
                person.LastName = request.LastName.Trim();

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
