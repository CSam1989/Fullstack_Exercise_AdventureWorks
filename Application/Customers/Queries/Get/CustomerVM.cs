using Application.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Customers.Queries.Get
{
    public class CustomerVM
    {
        public PaginationToReturnDto Pagination { get; set; }
        public IEnumerable<CustomerDto> List { get; set; }
    }
}
