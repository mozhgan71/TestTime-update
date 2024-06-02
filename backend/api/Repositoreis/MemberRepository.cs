namespace api.Repositoreis;

public class MemberRepository : IMemberRepository
{
    private const string _collectionName = "users";
    private readonly IMongoCollection<AppUser>? _collection;

    public MemberRepository(IMongoClient client, IMyMongoDbSettings dbSettings)
    {
        var database = client.GetDatabase(dbSettings.DatabaseName);
        _collection = database.GetCollection<AppUser>(_collectionName);

        // // _tokenService = tokenService;
    }

    public async Task<PagedList<AppUser>> GetAllAsync(PaginationParams paginationParams, CancellationToken cancellationToken)
    {
        IMongoQueryable<AppUser> query = _collection.AsQueryable();

        return await PagedList<AppUser>.CreatePagedListAsync(query, paginationParams.PageNumber, paginationParams.PageSize, cancellationToken);
    }

    // public async Task<List<MemberDto>> GetAllAsync(CancellationToken cancellationToken)
    // {
    //     List<AppUser> appUsers = await _collection.Find<AppUser>(new BsonDocument()).ToListAsync(cancellationToken);

    //     List<MemberDto> memberDtos = [];

    //     if (appUsers.Count != 0)
    //     {
    //         foreach (AppUser appUser in appUsers)
    //         {
    //             MemberDto memberDto = Mappers.ConvertAppUserToMemberDto(appUser);

    //             memberDtos.Add(memberDto);
    //         }

    //         return memberDtos;
    //     }

    //     return memberDtos ; // []
    // }

    public async Task<MemberDto?> GetByIdAsync(string? memberId, CancellationToken cancellationToken)
    {
        AppUser appUser = await _collection.Find<AppUser>(appUser => (appUser.Id).ToString() == memberId).FirstOrDefaultAsync(cancellationToken);

        if (appUser.Id.ToString() is not null)
        {
            return Mappers.ConvertAppUserToMemberDto(appUser);
        }

        return null;
    }

    public async Task<MemberDto?> GetByEmailAsync(string memberEmail, CancellationToken cancellationToken)
    {
        AppUser appUser = await _collection.Find<AppUser>(appUser =>
                appUser.Email == memberEmail).FirstOrDefaultAsync(cancellationToken);

        if (appUser.Id.ToString() is not null)
        {
            return Mappers.ConvertAppUserToMemberDto(appUser);
        }

        return null;
    }
}
