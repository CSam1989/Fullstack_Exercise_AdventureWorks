using System.Threading.Tasks;

namespace Application.Common.Interfaces.Identity
{
    public interface IRoleService
    {
        Task SetAdminRole(string userId, bool shouldBeAdmin);
    }
}