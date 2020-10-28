using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using Application.Common.Behaviours;
using Application.Common.Interfaces.Services;
using Application.Common.Services;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Common.Extensions
{
    public static class ServiceCollection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehaviour<,>));
            services.AddTransient(typeof(IPaginationService<>), typeof(PaginationService<>));

            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddMediatR(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}
