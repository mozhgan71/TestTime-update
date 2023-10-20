namespace api.Controllers;

public class AccountController : BaseApiController
{
    #region Token Settings

    // private readonly ITokenService _tokenService; // save user credential as a token
    private readonly IAccountRepository _accountRepository;

    // constructor - dependency injection
    public AccountController(IAccountRepository accountRepository)
    {
        _accountRepository = accountRepository;

        // _tokenService = tokenService;
    }
    #endregion

    /// <summary>
    /// Create accounts
    /// Concurrency => async is used
    /// </summary>
    /// <param name="userInput"></param>
    /// <param name="cancellationToken"></param>
    /// <returns>UserDto</returns>
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto userInput, CancellationToken cancellationToken) // parameter
    {
        if (userInput.Password != userInput.ConfirmPassword) // check if passwords match
            return BadRequest("Passwords don't match!"); // is it correct? What does it do?

        UserDto? userDto = await _accountRepository.CreateAsync(userInput, cancellationToken); // argument

        if (userDto is null)
            return BadRequest("Email/Username is taken.");

        return userDto;
    }

    /// <summary>
    /// Login accounts
    /// </summary>
    /// <param name="userLogInEmail" name="userLogInPassword"></param>
    /// <param name="cancellationToken"></param>
    /// <returns>UserDto</returns>
    [HttpGet("login/{userLogInEmail}/{userLogInPassword}")]
    public async Task<ActionResult<UserDto>> Login(string userLogInEmail, string userLogInPassword, CancellationToken cancellationToken)
    {
        UserDto? userDto = await _accountRepository.LoginAsync(userLogInEmail, userLogInPassword, cancellationToken);

        if (userDto is null)
            return Unauthorized("Wrong username or password");

        return userDto;
    }

    // [HttpGet("get-by-email-password/{email}/{password}")]
    // public ActionResult<AppUser>? GetForLogIn(string email, string password)
    // {
    //     AppUser user = _collection.Find(user => user.Email == email.ToLower().Trim() && user.Password == password.Trim()).FirstOrDefault();

    //     if (user is null)
    //     {
    //         return Unauthorized("هویت شما تایید نشد لطفا ثبت نام کنید.");
    //     }

    //     return user;
    // }
}
