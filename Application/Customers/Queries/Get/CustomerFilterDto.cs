using Application.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Customers.Queries.Get
{
    public class CustomerFilterDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AccountNumber { get; set; }
        public decimal? SumTotalDue { get; set; }
        public bool MustSalesBeHigherThanSum { get; set; }
    }
}
