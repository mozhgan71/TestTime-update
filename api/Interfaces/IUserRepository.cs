namespace api.Interfaces;

public interface IUserRepository
{
    public Task<List<UserDto>> GetAllAsync(CancellationToken cancellationToken);

    public Task<UserDto?> GetByIdAsync(string userId, CancellationToken cancellationToken);

    public Task<UpdateResult?> UpdateByIdAsync(string userId, RegisterDto userInput, CancellationToken cancellationToken);

    public Task<DeleteResult?> DeleteAsync(string userId, CancellationToken cancellationToken);
}