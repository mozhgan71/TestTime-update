namespace api.Interfaces;

public interface IUserRepository
{
    public Task<UserDto?> GetByIdAsync(string? userId, CancellationToken cancellationToken);

    public Task<UpdateResult?> UpdateByIdAsync(string userId, UpdateDto userInput, CancellationToken cancellationToken);

    public Task<DeleteResult?> DeleteAsync(string userId, CancellationToken cancellationToken);
}