using System.Collections.Generic;
using System.Linq;
using Application.Common.Mappings;
using AutoMapper;
using Domain.Models;

namespace Application.Customers.Queries.Get
{
    public class CustomerDto: IMapFrom<Customer>
    {
        public int CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public decimal SumTotalDue { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Customer, CustomerDto>()
                .ForMember(dest => dest.FirstName,
                    opt => opt.MapFrom(
                        src => src.Person.FirstName))
                .ForMember(dest => dest.LastName,
                    opt => opt.MapFrom(
                        src => src.Person.LastName))
                .ForMember(dest => dest.SumTotalDue,
                    opt => opt.MapFrom(
                        src => src.SalesOrderHeader.Sum(s => s.TotalDue)));
        }
    }
}
