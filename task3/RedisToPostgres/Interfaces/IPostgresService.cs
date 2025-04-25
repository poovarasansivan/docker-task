using RedisToPostgres.Models;

namespace RedisToPostgres.Interfaces
{
    public interface IPostgresService
    {
        void InsertVote(Vote vote);
    }
}