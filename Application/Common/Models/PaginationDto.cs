using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Common.Models
{
    public class PaginationDto
    {
        const int maxPageSize = 250;
        public int PageNumber { get; set; } = 1;

        private int _pageSize = 50;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }
    }
}
