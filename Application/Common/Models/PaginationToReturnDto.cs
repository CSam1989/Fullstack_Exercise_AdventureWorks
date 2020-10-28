using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Common.Models
{
    public class PaginationToReturnDto: PaginationDto
    {
        public int TotalCount { get; set; }
    }
}
