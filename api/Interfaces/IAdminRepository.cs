namespace api.Interfaces;

public interface IAdminRepository
{
    public Task<AdminResponseDto?> CreateAsync(RegisterAdminDto userInput, CancellationToken cancellationToken);

    public Task<List<Admin>?> GetAllAsync(CancellationToken cancellationToken);

    public Task<UpdateResult?> UpdateByIdAsync(string userId, RegisterAdminDto userInput, CancellationToken cancellationToken);

    public Task<DeleteResult?> DeleteAsync(string userId, CancellationToken cancellationToken);
}