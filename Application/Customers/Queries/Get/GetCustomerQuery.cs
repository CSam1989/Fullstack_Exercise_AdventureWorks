using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Interfaces.Persistance;
using Application.Common.Interfaces.Services;
using Application.Common.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customers.Queries.Get
{
    public class GetCustomerQuery:PaginationDto, IRequest<CustomerVM>
    {
        public class GetCustomerQueryHandler : IRequestHandler<GetCustomerQuery, CustomerVM>
        {
            private readonly IAppDbContext _context;
            private readonly IMapper _mapper;
            private readonly IPaginationService<Customer> _pagination;

            private int totalCount;
            private int currentPage;
            private IQueryable<Customer> paginatedCustomerQuery;

            public GetCustomerQueryHandler(IAppDbContext context, IMapper mapper, IPaginationService<Customer> pagination)
            {
                _context = context;
                _mapper = mapper;
                this._pagination = pagination;
            }
            public async Task<CustomerVM> Handle(GetCustomerQuery request, CancellationToken cancellationToken)
            {
                var customerQuery = _context.Customer
                    .Where(c => !string.IsNullOrEmpty(c.Person.FirstName) && !string.IsNullOrEmpty(c.Person.LastName))
                    .AsQueryable();

                await getPaginationDetails(customerQuery, request.PageNumber, request.PageSize);

                return new CustomerVM
                {
                    List = await paginatedCustomerQuery
                        .Include(c => c.Person)
                        .Include(c => c.SalesOrderHeader)
                        .ProjectTo<CustomerDto>(_mapper.ConfigurationProvider)
                        .ToListAsync(cancellationToken),
                    Pagination = new PaginationToReturnDto
                    {
                        PageNumber = currentPage,
                        PageSize = request.PageSize,
                        TotalCount = totalCount
                    }
                };
            }

            private async Task getPaginationDetails(IQueryable<Customer> query, int pageNumber, int pageSize)
            {
                totalCount = await _pagination.GetTotalItemsCount(query);
                currentPage = _pagination.GetPageNumberAndNotExceedTotaLPages(pageNumber, pageSize, totalCount);
                paginatedCustomerQuery = _pagination.Paginate(query, currentPage, pageSize);
            }
        }
    }
}
