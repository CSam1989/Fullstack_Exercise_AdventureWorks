using Application.Common.Interfaces.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Services
{
    public class PaginationService<T> : IPaginationService<T>
        where T : class
    {
        public IQueryable<T> Paginate(IQueryable<T> query, int currentPage, int pageSize)
        {
            return query
                .Skip((currentPage - 1) * pageSize)
                .Take(pageSize);
        }

        public async Task<int> GetTotalItemsCount(IQueryable<T> query)
        {
            return await query.CountAsync();
        }

        public int GetPageNumberAndNotExceedTotaLPages(int pageNumber, int pageSize, int totalItemCount)
        {
            var totalPages = (int)Math.Ceiling(totalItemCount / (double)pageSize);
            return pageNumber <= totalPages ? pageNumber : totalPages;
        }
    }
}
