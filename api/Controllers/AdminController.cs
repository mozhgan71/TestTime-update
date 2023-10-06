using api.Models;
using api.Settings;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
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

        AdminResponseDto? adminDto = await _adminRepository.Create(userInput, cancellationToken);

        if (adminDto is null)
            return BadRequest("Email/Username is taken.");

        return adminDto;
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