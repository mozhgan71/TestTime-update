namespace api.Interfaces;

public interface IAdminRepository
{
    // public Task<AdminResponseDto?> CreateAsync(RegisterAdminDto userInput, CancellationToken cancellationToken);

    // public Task<List<AdminResponseDto>> GetAllAsync(CancellationToken cancellationToken);

    // public Task<UpdateResult?> UpdateByIdAsync(string userId, RegisterAdminDto userInput, CancellationToken cancellationToken);

    // public Task<DeleteResult?> DeleteAsync(string userId, CancellationToken cancellationToken);

    // public Task<AdminResponseDto?> LoginAsync(AdminLoginDto userInput, CancellationToken cancellationToken);

    public Task<IEnumerable<UserWithRoleDto>> GetUsersWithRolesAsync();

    public Task<bool> DeleteUserAsync(string userName);
    
    public Task<bool> SuspendUserAsync(string userName);
}