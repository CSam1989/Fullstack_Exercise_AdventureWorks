using System;
using System.Collections.Generic;
using System.Text;
using Application.Common.Interfaces;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Common.Extensions
{
    public static class ServiceCollection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IAppDbContext>(provider => provider.GetService<AppDbContext>());
            services.AddDbContext<AppDbContext>(opt => opt
                .UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection"),
                    sqlOptions =>
                    {
                        sqlOptions.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName);
                    }));

            return services;
        }
    }
}