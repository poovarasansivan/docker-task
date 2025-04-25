using RedisToPostgres.Interfaces;
using RedisToPostgres.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IRedisService, RedisService>();
builder.Services.AddSingleton<IPostgresService, PostgresService>();
builder.Services.AddHostedService<VoteSyncService>();

var app = builder.Build();
app.Run();