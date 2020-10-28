using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Interfaces.Services
{
    public interface IPaginationService<T>
         where T : class
    {
        IQueryable<T> Paginate(IQueryable<T> query, int currentPage, int pageSize);
        Task<int> GetTotalItemsCount(IQueryable<T> query);
        int GetPageNumberAndNotExceedTotaLPages(int pageNumber, int pageSize, int totalItemCount);
    }
}
