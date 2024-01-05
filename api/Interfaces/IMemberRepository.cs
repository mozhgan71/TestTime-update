using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Interfaces;

public interface IMemberRepository
{
    public Task<List<MemberDto>> GetAllAsync(CancellationToken cancellationToken);

    public Task<MemberDto?> GetByIdAsync(string? memberId, CancellationToken cancellationToken);
}
