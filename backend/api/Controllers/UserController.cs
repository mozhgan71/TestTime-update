namespace api.Controllers;

// [Authorize]
public class UserController(IUserRepository _userRepository) : BaseApiController
{
    #region user managemant

    [HttpGet("get-by-id")]
    public async Task<ActionResult<AppUser>?> GetById(CancellationToken cancellationToken)
    {
        AppUser? appUser = await _userRepository.GetByIdAsync(User.GetUserId(), cancellationToken);

        if (appUser is null)
        {
            return NotFound("No user was found");
        }

        return appUser;
    }

    [HttpPut]
    public async Task<ActionResult<UpdateResult?>> Update(UpdateDto userInput, CancellationToken cancellationToken)
    {
        UpdateResult? updateResult = await _userRepository.UpdateByIdAsync(userInput, User.GetUserId(), cancellationToken);

        return updateResult is null || updateResult.ModifiedCount == 0
            ? BadRequest(".تغییرات با خطا مواجه شد")
            : Ok(new { message = ".تغییرات با موفقیت ثبت شد" });
    }

    [HttpDelete("delete/{userId}")]
    public async Task<ActionResult<DeleteResult?>> Delete(string userId, CancellationToken cancellationToken)
    {
        return await _userRepository.DeleteAsync(userId, cancellationToken);
    }

    #endregion

    #region  photomanagement
    // only jpeg, jpg, png. Between 250KB(500x500) and 4MB(2000x2000)
    [HttpPost("add-photo")]
    public async Task<ActionResult<Photo>> AddPhoto(
            [AllowedFileExtensions, FileSize(500 * 500, 2000 * 2000)]
            IFormFile file, CancellationToken cancellationToken
        )
    {
        if (file is null) return BadRequest("No file is selected with this request.");

        /*                          ** Photo Upload Steps/Process **
            UserController => UserRepository: GetById() => PhotoService => PhotoModifySaveService
            PhotoService => UserRepository: MongoDb, return Photo => UserController
        */
        Photo? photo = await _userRepository.UploadPhotoAsync(file, User.GetUserId(), cancellationToken);

        return photo is null ? BadRequest("Add photo failed. See logger") : photo;
    }

    [HttpPut("set-main-photo")]
    public async Task<ActionResult> SetMainPhoto(string photoUrlIn, CancellationToken cancellationToken)
    {
        UpdateResult? updateResult = await _userRepository.SetMainPhotoAsync(User.GetUserId(), photoUrlIn, cancellationToken);

        return updateResult is null || updateResult.ModifiedCount == 0
            ? BadRequest("Set as main photo failed. Try again in a few moments. If the issue persists contact the admin.")
            : Ok(new { message = "Set this photo as main succeeded." });
    }

    [HttpPut("delete-photo")]
    public async Task<ActionResult> DeletePhoto(string photoUrlIn, CancellationToken cancellationToken)
    {
        UpdateResult? updateResult = await _userRepository.DeletePhotoAsync(User.GetUserId(), photoUrlIn, cancellationToken);

        return updateResult is null || updateResult.ModifiedCount == 0
            ? BadRequest("Photo deletion failed. Try again in a few moments. If the issue persists contact the admin.")
            : Ok(new { message = "Photo deleted successfully." });
    }
    #endregion

    #region old code
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
    #endregion
}