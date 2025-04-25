using System.Collections.Generic;
using RedisToPostgres.Models;

namespace RedisToPostgres.Interfaces
{
    public interface IRedisService
    {
        Dictionary<string, int> GetVotes();
    }
}
