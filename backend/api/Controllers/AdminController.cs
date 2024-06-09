namespace api.Controllers;

[Authorize(Policy = "RequiredAdminRole")]
public class AdminController(IAdminRepository _adminRepository) : BaseApiController
{
     [HttpGet("users-with-roles")]
    public async Task<ActionResult<IEnumerable<UserWithRoleDto>>> UsersWithRoles()
    {
        IEnumerable<UserWithRoleDto> users = await _adminRepository.GetUsersWithRolesAsync();

        return !users.Any() ? NoContent() : Ok(users);
    }

    // [HttpGet("getall")]
    // public async Task<ActionResult<IEnumerable<AdminResponseDto>>> GetAll(CancellationToken cancellationToken)
    // {
    //     List<AdminResponseDto> admins = await _adminRepository.GetAllAsync(cancellationToken);

    //     if (admins.Count == 0)
    //         return NoContent();

    //     return admins;
    // }

    // [HttpPut("update/{userId}")]
    // public async Task<ActionResult<UpdateResult?>> Update(string userId, RegisterAdminDto userInput, CancellationToken cancellationToken)
    // {
    //     return await _adminRepository.UpdateByIdAsync(userId, userInput, cancellationToken);
    // }

    // [HttpDelete("delete/{userId}")]
    // public async Task<ActionResult<DeleteResult?>> Delete(string userId, CancellationToken cancellationToken)
    // {
    //     return await _adminRepository.DeleteAsync(userId, cancellationToken);
    // }

    [HttpDelete("delete-user/{userName}")]
    public async Task<ActionResult<IEnumerable<UserWithRoleDto>>> DeleteUser(string userName)
    {
        return await _adminRepository.DeleteUserAsync(userName)
            ? Ok(new Response(Message: $""" "{userName}" got deleted successfully."""))
            : BadRequest("User deletion failed.");
    }

    [HttpPut("suspend-user/{userName}")]
    public async Task<ActionResult<IEnumerable<UserWithRoleDto>>> SuspendUser(string userName)
    {
        return await _adminRepository.SuspendUserAsync(userName)
            ? Ok(new Response(Message: $""" "{userName}" got suspended successfully."""))
            : BadRequest("User suspention failed.");
    }

    
    // /// <summary>
    // /// Create accounts
    // /// Concurrency => async is used
    // /// </summary>
    // /// <param name="userInput"></param>
    // /// <param name="cancellationToken"></param>
    // /// <returns>AdminResponseDto</returns>
    // [HttpPost("register")]
    // public async Task<ActionResult<AdminResponseDto>> Create(RegisterAdminDto userInput, CancellationToken cancellationToken)
    // {
    //     if (userInput.Password != userInput.ConfirmPassword)
    //         return BadRequest("Passwords don't match!");

    //     AdminResponseDto? adminDto = await _adminRepository.CreateAsync(userInput, cancellationToken);

    //     if (adminDto is null)
    //         return BadRequest("Email/Username is taken.");

    //     return adminDto;
    // }

    // [AllowAnonymous]
    // [HttpPost("login")]
    // public async Task<ActionResult<AdminResponseDto>> Login(AdminLoginDto userInput, CancellationToken cancellationToken)
    // {
    //     AdminResponseDto? adminResponseDto = await _adminRepository.LoginAsync(userInput, cancellationToken);

    //     if (adminResponseDto is null)
    //         return Unauthorized("Wrong username or password");

    //     return adminResponseDto; // successful login
    // }
}