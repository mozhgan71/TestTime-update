namespace api.Interfaces;

public interface IAdminRepository
{
    public Task<AdminResponseDto?> Create(RegisterAdminDto userInput, CancellationToken cancellationToken);
}
