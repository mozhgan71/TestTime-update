namespace api.Controllers;

public class AdminController : BaseApiController
{
    private readonly IAdminRepository _adminRepository;
    // Dependency Injection
    public AdminController(IAdminRepository adminRepository)
    {
        _adminRepository = adminRepository;
    }

    /// <summary>
    /// Create accounts
    /// Concurrency => async is used
    /// </summary>
    /// <param name="userInput"></param>
    /// <param name="cancellationToken"></param>
    /// <returns>AdminResponseDto</returns>
    [HttpPost("register")]
    public async Task<ActionResult<AdminResponseDto>> Create(RegisterAdminDto userInput, CancellationToken cancellationToken)
    {
        if (userInput.Password != userInput.ConfirmPassword)
            return BadRequest("Passwords don't match!");

        AdminResponseDto? adminDto = await _adminRepository.CreateAsync(userInput, cancellationToken);

        if (adminDto is null)
            return BadRequest("Email/Username is taken.");

        return adminDto;
    }

    [HttpGet("getall")]
    public async Task<ActionResult<IEnumerable<AdminResponseDto>>> GetAll(CancellationToken cancellationToken)
    {
        List<AdminResponseDto> admins = await _adminRepository.GetAllAsync(cancellationToken);

        if (!admins.Any())
            return NoContent();

        return admins;
    }

    [HttpPut("update/{userId}")]
    public async Task<ActionResult<UpdateResult?>> Update(string userId, RegisterAdminDto userInput, CancellationToken cancellationToken)
    {
        return await _adminRepository.UpdateByIdAsync(userId, userInput, cancellationToken);
    }

    [HttpDelete("delete/{userId}")]
    public async Task<ActionResult<DeleteResult?>> Delete(string userId, CancellationToken cancellationToken)
    {
        return await _adminRepository.DeleteAsync(userId, cancellationToken);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AdminResponseDto>> Login(AdminLoginDto userInput, CancellationToken cancellationToken)
    {
        AdminResponseDto? adminResponseDto = await _adminRepository.LoginAsync(userInput, cancellationToken);

        if (adminResponseDto is null)
            return Unauthorized("Wrong username or password");

        return adminResponseDto; // successful login
    }
}