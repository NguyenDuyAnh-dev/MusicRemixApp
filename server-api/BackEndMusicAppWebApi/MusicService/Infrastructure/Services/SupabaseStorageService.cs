using MusicService.Application.Services;
using Supabase;

namespace MusicService.Infrastructure.Services
{
    public class SupabaseStorageService : IFileStorageService
    {
        private readonly Client _client;
        private bool _initialized = false;

        public SupabaseStorageService(IConfiguration configuration)
        {
            var url = configuration["Supabase:Url"];
            var key = configuration["Supabase:Key"];
            _client = new Client(url, key);
        }

        private async Task EnsureInitAsync()
        {
            if (!_initialized)
            {
                await _client.InitializeAsync();
                _initialized = true;
            }
        }

        public async Task<string> UploadAsync(
            Stream stream,
            string fileName,
            string bucketName)
        {
            await EnsureInitAsync();

            var bucket = _client.Storage.From(bucketName);

            using var ms = new MemoryStream();
            await stream.CopyToAsync(ms);

            await bucket.Upload(
                ms.ToArray(),
                fileName,
                new Supabase.Storage.FileOptions { Upsert = true });

            return bucket.GetPublicUrl(fileName);
        }

    }
}
