namespace api.Interfaces;

public interface IPhotoService
{
    public Task<string[]?> AddPhotoToDisk(IFormFile file, string userId, CancellationToken cancellationToken);

    public Task<bool> DeletePhotoFromDisk(Photo photo, CancellationToken cancellationToken);
}
