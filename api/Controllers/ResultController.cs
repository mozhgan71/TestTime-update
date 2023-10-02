using api.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using api.Settings;
using MongoDB.Bson;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResultController : ControllerBase
{
    private readonly IMongoCollection<Result> _collection;

    public ResultController(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<Result>("results");
    }

    [HttpPost("add-result")]
    public ActionResult<Result> Create(Result autoInput)
    {
        Result result = new Result(
           Id: null,
           UserId: autoInput.UserId,
           TestName: autoInput.TestName.ToUpper().Trim(),
           MyDate: autoInput.MyDate,
           TestHour: autoInput.TestHour,
           TestMinute: autoInput.TestMinute,
           TestSecond: autoInput.TestSecond,
           NumberOfCorrect: autoInput.NumberOfCorrect,
           NumberOfWrong: autoInput.NumberOfWrong,
           NumberOfNoAnswer: autoInput.NumberOfNoAnswer,
           Description: autoInput.Description
        );

        _collection.InsertOne(result);

        return result;
    }

    [HttpGet("get-by-user-id/{userId}")]
    public ActionResult<List<Result>> Get(string userId)
    {
        List<Result> results = _collection.Find(result => result.UserId == userId).ToList();

        if (results is null)
        {
            return NotFound("No result with this user id was found.");
        }

        return results;
    }

    [HttpGet("get-by-id/{resultId}")]
    public ActionResult<Result> GetById(string resultId)
    {
        Result result = _collection.Find(result => result.Id == resultId).FirstOrDefault();

        if (result is null)
        {
            return NotFound("No result with this id was found.");
        }

        return result;
    }

    [HttpGet("get-by-test-name/{testName}")]
    public ActionResult<List<Result>> GetByTestName(string testName)
    {
        List<Result> results = _collection.Find(result => result.TestName == testName.ToUpper().Trim()).ToList();

        if (results is null)
        {
            return NotFound("No result with this testname was found.");
        }

        return results;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Result>> GetAll()
    {
        List<Result> results = _collection.Find<Result>(new BsonDocument()).ToList();

        if (!results.Any())
        {
            return Ok("Your resultlist is empty.");
        }

        return results;
    }

    [HttpDelete("delete/{resultId}")]
    public ActionResult<DeleteResult> Delete(string resultId)
    {
        return _collection.DeleteOne<Result>(doc => doc.Id == resultId);
    }
}