using Microsoft.AspNetCore.Authentication;

namespace api.Controllers;

[Authorize]
public class AccountController(IAccountRepository _accountRepository) : BaseApiController
{
    /// <summary>
    /// Create accounts
    /// Concurrency => async is used
    /// </summary>
    /// <param name="userInput"></param>
    /// <param name="cancellationToken"></param>
    /// <returns>UserDto</returns>
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<LoggedInDto>> Register(RegisterDto userInput, CancellationToken cancellationToken) // parameter
    {
        if (userInput.Password != userInput.ConfirmPassword) // check if passwords match
            return BadRequest("Passwords don't match!"); // is it correct? What does it do?

        LoggedInDto? loggedInDto = await _accountRepository.CreateAsync(userInput, cancellationToken); // argument

        if (loggedInDto is null)
            return BadRequest("Email/Username is taken.");

        return loggedInDto;
    }

    /// <summary>
    /// Login accounts
    /// </summary>
    /// <param name="userLogInEmail" name="userLogInPassword"></param>
    /// <param name="cancellationToken"></param>
    /// <returns>UserDto</returns>

    [AllowAnonymous]
    [HttpGet("login/{userLogInEmail}/{userLogInPassword}")]
    public async Task<ActionResult<LoggedInDto>> Login(string userLogInEmail, string userLogInPassword, CancellationToken cancellationToken)
    {
        LoggedInDto? loggedInDto = await _accountRepository.LoginAsync(userLogInEmail, userLogInPassword, cancellationToken);

        if (loggedInDto is null)
            return Unauthorized("Wrong username or password");

        return loggedInDto;
    }

    /// <summary>
    /// Get loggedInUser when user refreshes the browser. 
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns>LoggedInDto</returns>
    [HttpGet]
    public async Task<ActionResult<LoggedInDto?>> ReloadLoggedInUser(CancellationToken cancellationToken)
    {
        // get token value from token
        string? tokenValue = Response.HttpContext.GetTokenAsync("access_token").Result;

        LoggedInDto? loggedInDto = await _accountRepository.ReloadLoggedInUserAsync(User.GetUserId(), tokenValue, cancellationToken);

        //// BEST/SHORTEST WAY ////
        return loggedInDto is not null ? loggedInDto : BadRequest("Relogin user failed"); //  Ternary Operator: if/else shortcut

        //// MEDUIM LONG WAY ////
        // LoggedInDto? myResult =  loggedInDto is not null ? loggedInDto : null; //  Ternary Operator: if/else shortcut
        // return myResult;

        //// LOGN WAY /////
        // if (loggedInDto is not null)
        //     return loggedInDto;
        // else
        //     return BadRequest("Reloading LoggedInUser failed");
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

    // [AllowAnonymous]
    // Reset Passsword

    // [Authorize]
    // Deactivate

    // [Authorize]
    // Delete
}
