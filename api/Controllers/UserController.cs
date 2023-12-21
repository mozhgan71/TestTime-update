using Microsoft.AspNetCore.Authorization;

namespace api.Controllers;

public class UserController(IUserRepository _userRepository) : BaseApiController
{
    // [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAll(CancellationToken cancellationToken)
    {
        List<UserDto> userDtos = await _userRepository.GetAllAsync(cancellationToken);

        if (!userDtos.Any()) // []
            return NoContent();

        return userDtos;
    }
    [Authorize]
    [HttpGet("get-by-id")]
    public async Task<ActionResult<UserDto>?> GetById(CancellationToken cancellationToken)
    {
        UserDto? userDto = await _userRepository.GetByIdAsync(ClaimPrincipalExtensions.GetUserId(User), cancellationToken);

        if (userDto is null)
        {
            return NotFound("No user was found");
        }
 
        return userDto;
    }
      
    [HttpPut("update/{userId}")]
    public async Task<ActionResult<UpdateResult?>> Update(string userId, UpdateDto userInput, CancellationToken cancellationToken)
    {
        return await _userRepository.UpdateByIdAsync(userId, userInput, cancellationToken);
    }

    [HttpDelete("delete/{userId}")]
    public async Task<ActionResult<DeleteResult?>> Delete(string userId, CancellationToken cancellationToken)
    {
        return await _userRepository.DeleteAsync(userId, cancellationToken);
    }

    // [HttpGet("get-by-user-id/{userId}")]
    // public ActionResult<AppUser> Get(string userId)
    // {
    //     AppUser user = _collection.Find(user => user.Id == userId).FirstOrDefault();

    //     if (user is null)
    //     {
    //         return NotFound("No user with this user id was found.");
    //     }

    //     return user;
    // }


    // [HttpGet]
    // public ActionResult<IEnumerable<AppUser>> GetAll()
    // {
    //     List<AppUser> users = _collection.Find<AppUser>(new BsonDocument()).ToList();

    //     if (!users.Any())
    //     {
    //         return Ok("Your userlist is empty.");
    //     }

    //     return users;
    // }

    // [HttpPut("update/{userId}")]
    // public ActionResult<UpdateResult> UpdateUserById(string userId, AppUser userIn)
    // {
    //     var updatedDoc = Builders<AppUser>.Update
    //     .Set(doc => doc.Name, userIn.Name)
    //     .Set(doc => doc.Family, userIn.Family)
    //     .Set(doc => doc.Password, userIn.Password)
    //     .Set(doc => doc.ConfirmPassword, userIn.ConfirmPassword)
    //     .Set(doc => doc.Age, userIn.Age)
    //     .Set(doc => doc.Education, userIn.Education);

    //     return _collection.UpdateOne<AppUser>(doc => doc.Id == userId, updatedDoc);
    // }

    // [HttpDelete("delete/{userId}")]
    // public ActionResult<DeleteResult> Delete(string userId)
    // {
    //     return _collection.DeleteOne<AppUser>(doc => doc.Id == userId);
    // }
}