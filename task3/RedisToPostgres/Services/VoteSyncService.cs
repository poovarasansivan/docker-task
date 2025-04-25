using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RedisToPostgres.Interfaces;
using RedisToPostgres.Models;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace RedisToPostgres.Services
{
    public class VoteSyncService : BackgroundService
    {
        private readonly ILogger<VoteSyncService> _logger;
        private readonly IRedisService _redisService;
        private readonly IPostgresService _postgresService;

        public VoteSyncService(ILogger<VoteSyncService> logger, IRedisService redisService, IPostgresService postgresService)
        {
            _logger = logger;
            _redisService = redisService;
            _postgresService = postgresService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var votes = _redisService.GetVotes();

                foreach (var vote in votes)
                {
                    _postgresService.InsertVote(new Vote { Option = vote.Key, Count = vote.Value });
                }

                _logger.LogInformation("Synced votes to DB at: {time}", DateTimeOffset.Now);

                await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken); // adjust interval as needed
            }
        }
    }
}
