namespace MusicService.Application.Services
{
    public interface IFileStorageService
    {
        Task<string> UploadAsync(
            Stream stream,
            string fileName,
            string bucketName);
    }
}
