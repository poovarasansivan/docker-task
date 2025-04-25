using StackExchange.Redis;
using RedisToPostgres.Interfaces;
using RedisToPostgres.Models;
using System.Collections.Generic;

namespace RedisToPostgres.Services
{
    public class RedisService : IRedisService
    {
        private readonly IDatabase _redisDb;

        public RedisService(IConfiguration configuration)
        {
            var redis = ConnectionMultiplexer.Connect(configuration["Redis:Connection"]);
            _redisDb = redis.GetDatabase();
        }

        public Dictionary<string, int> GetVotes()
        {
            var server = ConnectionMultiplexer.Connect("redis").GetServer("redis", 6379);
            var keys = server.Keys();
            var votes = new Dictionary<string, int>();

            foreach (var key in keys)
            {
                var value = _redisDb.StringGet(key);
                if (int.TryParse(value, out int count))
                {
                    votes[key] = count;
                }
            }
            return votes;
        }
    }
}