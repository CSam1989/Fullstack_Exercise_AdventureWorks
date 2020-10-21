using System.Threading.Tasks;

namespace Application.Common.Interfaces.Identity
{
    public interface ILoginService
    {
        Task<string> LoginAndGetToken(string username);
    }
}