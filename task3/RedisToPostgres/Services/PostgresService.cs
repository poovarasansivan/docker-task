using Npgsql;
using RedisToPostgres.Interfaces;
using RedisToPostgres.Models;

namespace RedisToPostgres.Services
{
    public class PostgresService : IPostgresService
    {
        private readonly string _connectionString;

        public PostgresService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("PostgresConnection");
        }

        public void InsertVote(Vote vote)
        {
            using var conn = new NpgsqlConnection(_connectionString);
            conn.Open();

            using var cmd = new NpgsqlCommand(@"INSERT INTO votes(option, count) VALUES(@option, @count)
                                                ON CONFLICT (option) DO UPDATE SET count = EXCLUDED.count", conn);
            cmd.Parameters.AddWithValue("option", vote.Option);
            cmd.Parameters.AddWithValue("count", vote.Count);
            cmd.ExecuteNonQuery();
        }
    }
}
