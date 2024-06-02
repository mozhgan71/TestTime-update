using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;

namespace api.Services;
public class TokenService : ITokenService
{
    private readonly IMongoCollection<AppUser> _collection;
    private readonly SymmetricSecurityKey? _key; // set it as nullable by ? mark
    private readonly UserManager<AppUser> _userManager;

    public TokenService(IConfiguration config, IMongoClient client, IMyMongoDbSettings dbSettings, UserManager<AppUser> userManager)
    {
        var database = client.GetDatabase(dbSettings.DatabaseName);
        // _collection = database.GetCollection<AppUser>(AppVariablesExtensions.collectionUsers);

        // TODO replace these
        string? tokenValue = config[AppVariablesExtensions.TokenKey];
        // string? tokenValue = config.GetValue<string>(AppVariablesExtensions.TokenKey);

        // throw exception if tokenValue is null
        _ = tokenValue ?? throw new ArgumentNullException("tokenValue cannot be null", nameof(tokenValue));

        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenValue!));

        _userManager = userManager;
    }

    public async Task<string> CreateToken(AppUser appUser)
    {
        _ = _key ?? throw new ArgumentNullException("_key cannot be null", nameof(_key));

        var claims = new List<Claim> {
            new Claim(JwtRegisteredClaimNames.NameId, appUser.Id.ToString())
            // new Claim(JwtRegisteredClaimNames.Email, appUser.Email)
        };

        // Get user's roles and add them all into claims
        IList<string>? roles = await _userManager.GetRolesAsync(appUser);
        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7), // Set expiration days
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}