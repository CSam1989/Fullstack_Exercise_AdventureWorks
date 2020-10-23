using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Interfaces.Persistance;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customers.Queries.Get
{
    public class GetCustomerQuery: IRequest<CustomerVM>
    {
        public class GetCustomerQueryHandler : IRequestHandler<GetCustomerQuery, CustomerVM>
        {
            private readonly IAppDbContext _context;
            private readonly IMapper _mapper;

            public GetCustomerQueryHandler(IAppDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<CustomerVM> Handle(GetCustomerQuery request, CancellationToken cancellationToken)
            {
                return new CustomerVM
                {
                    List = await _context.Customer
                        .Include(c => c.Person)
                        .Include(c => c.SalesOrderHeader)
                        .Where(c => !string.IsNullOrEmpty(c.Person.FirstName) && !string.IsNullOrEmpty(c.Person.LastName))
                        .Skip(0).Take(50)
                        .ProjectTo<CustomerDto>(_mapper.ConfigurationProvider)
                        .ToListAsync(cancellationToken)
                };
            }
        }
    }
}
