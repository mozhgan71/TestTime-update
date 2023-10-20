namespace api.Interfaces;

public interface IAccountRepository
{
    public Task<UserDto?> CreateAsync(RegisterDto userInput, CancellationToken cancellationToken);

    public Task<UserDto?> LoginAsync(string userLogInEmail, string userLogInPassword, CancellationToken cancellationToken);
}