using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Customers.Queries.Get
{
    public class CustomerVM
    {
        public IEnumerable<CustomerDto> List { get; set; }
    }
}
