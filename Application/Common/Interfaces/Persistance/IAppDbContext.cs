using System.Threading;
using System.Threading.Tasks;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces.Persistance
{
    public interface IAppDbContext
    {
        DbSet<Customer> Customer { get; set; }
        DbSet<Person> Person { get; set; }
        DbSet<SalesOrderHeader> SalesOrderHeader { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken());
    }
}