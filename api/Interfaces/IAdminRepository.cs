namespace api.Interfaces;

public interface IAdminRepository
{
    public Task<AdminResponseDto?> Create(RegisterAdminDto userInput, CancellationToken cancellationToken);

    public Task<IEnumerable<Admin>?> GetAll(CancellationToken cancellationToken);

    public Task<UpdateResult?> UpdateById(string userId, RegisterAdminDto userInput, CancellationToken cancellationToken);

    public Task<DeleteResult?> Delete(string userId, CancellationToken cancellationToken);
}