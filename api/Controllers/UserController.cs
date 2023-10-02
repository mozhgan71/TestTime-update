using api.Models;
using api.Settings;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IMongoCollection<AppUser> _collection;

    public UserController(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<AppUser>("users");
    }

    [HttpPost("register")]
    public ActionResult<AppUser> Create(AppUser userInput)
    {
        bool hasDocs = _collection.AsQueryable().Where<AppUser>(user => user.Email == userInput.Email.ToLower().Trim()).Any();

        if (hasDocs)
            return BadRequest($"کاربری با ایمیل {userInput.Email} قبلا ثبت نام کرده است.");
        {
            AppUser user = new AppUser(
               Id: null,
               Name: userInput.Name,
               Family: userInput.Family,
               Email: userInput.Email.ToLower().Trim(),
               Password: userInput.Password,
               ConfirmPassword: userInput.ConfirmPassword,
               Age: userInput.Age,
               Education: userInput.Education,
               Rules: userInput.Rules
            );

            _collection.InsertOne(user);

            return user;
        }
    }

    [HttpGet("get-by-user-id/{userId}")]
    public ActionResult<AppUser> Get(string userId)
    {
        AppUser user = _collection.Find(user => user.Id == userId).FirstOrDefault();

        if (user is null)
        {
            return NotFound("No user with this user id was found.");
        }

        return user;
    }

    [HttpGet("get-by-email-password/{email}/{password}")]
    public ActionResult<AppUser>? GetForLogIn(string email, string password)
    {
        AppUser user = _collection.Find(user => user.Email == email.ToLower().Trim() && user.Password == password.Trim()).FirstOrDefault();

        if (user is null)
        {
            return Unauthorized("هویت شما تایید نشد لطفا ثبت نام کنید.");
        }

        return user;
    }

    [HttpGet]
    public ActionResult<IEnumerable<AppUser>> GetAll()
    {
        List<AppUser> users = _collection.Find<AppUser>(new BsonDocument()).ToList();

        if (!users.Any())
        {
            return Ok("Your userlist is empty.");
        }

        return users;
    }

    [HttpPut("update/{userId}")]
    public ActionResult<UpdateResult> UpdateUserById(string userId, AppUser userIn)
    {
        var updatedDoc = Builders<AppUser>.Update
        .Set(doc => doc.Name, userIn.Name)
        .Set(doc => doc.Family, userIn.Family)
        .Set(doc => doc.Password, userIn.Password)
        .Set(doc => doc.ConfirmPassword, userIn.ConfirmPassword)
        .Set(doc => doc.Age, userIn.Age)
        .Set(doc => doc.Education, userIn.Education);

        return _collection.UpdateOne<AppUser>(doc => doc.Id == userId, updatedDoc);
    }

    [HttpDelete("delete/{userId}")]
    public ActionResult<DeleteResult> Delete(string userId)
    {
        return _collection.DeleteOne<AppUser>(doc => doc.Id == userId);
    }
}