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
    public async Task<ActionResult<IEnumerable<Admin>>> GetAll(CancellationToken cancellationToken)
    {
        List<Admin>? admins = await _adminRepository.GetAllAsync(cancellationToken);

        if (admins is null)
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

    // [HttpPost("login")]
    // public ActionResult<Admin> Login(Admin adminInput)
    // {
    //     Admin admin = _collection.Find<Admin>(admin =>
    //             admin.Email == adminInput.Email
    //             && admin.Password == adminInput.Password
    //         ).FirstOrDefault();

    //     if (admin is null)
    //         return Unauthorized(".نام کاربری یا رمز عبور اشتباه است");

    //     return admin;
    // }
}