namespace api.Interfaces;

public interface IAccountRepository
{
    public Task<LoggedInDto?> CreateAsync(RegisterDto userInput, CancellationToken cancellationToken);

    public Task<LoggedInDto?> LoginAsync(string userLogInEmail, string userLogInPassword, CancellationToken cancellationToken);
}