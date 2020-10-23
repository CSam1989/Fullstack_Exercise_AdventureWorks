using System.Linq;
using Application.Customers.Queries.Get;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Extensions
{
    public static class CustomerQueryExtensions
    {
        public static IQueryable<Customer> CustomFilter(this IQueryable<Customer> query, CustomerFilterDto filters)
        {
            //making sure all needed tables are included
            query = query
                .Include(c => c.Person)
                .Include(c => c.SalesOrderHeader);

            query = !string.IsNullOrEmpty(filters.FirstName)
                ? query.Where(c => c.Person.FirstName.Contains(filters.FirstName.Trim()))
                : query;

            query = !string.IsNullOrEmpty(filters.LastName)
                ? query.Where(c => c.Person.LastName.Contains(filters.LastName.Trim()))
                : query;

            query = !string.IsNullOrEmpty(filters.AccountNumber)
                ? query.Where(c => c.AccountNumber.Contains(filters.AccountNumber.Trim()))
                : query;

            query = filters.Sales.HasValue
                ? filters.MustSalesBeHigherThanSum
                    ? query.Where(c => c.SalesOrderHeader.Sum(s => s.TotalDue) > filters.Sales)
                    : query.Where(c => c.SalesOrderHeader.Sum(s => s.TotalDue) <= filters.Sales)
                : query;

            return query;
        }
    }
}