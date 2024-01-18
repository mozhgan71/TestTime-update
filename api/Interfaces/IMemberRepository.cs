namespace api.Interfaces;

public interface IMemberRepository
{
    public Task<List<MemberDto>> GetAllAsync(CancellationToken cancellationToken);

    public Task<MemberDto?> GetByIdAsync(string? memberId, CancellationToken cancellationToken);
}
