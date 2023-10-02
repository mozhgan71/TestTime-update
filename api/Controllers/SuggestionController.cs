using api.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using api.Settings;
using MongoDB.Bson;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SuggestionController : ControllerBase
{
    private readonly IMongoCollection<Suggestion> _collection;

    public SuggestionController(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<Suggestion>("suggestions");
    }

    [HttpPost("add-suggestion")]
    public ActionResult<Suggestion> Create(Suggestion userInput)
    {
        Suggestion suggestion = new Suggestion(
           Id: null,
           UserId: userInput.UserId,
           FullName: userInput.FullName,
           Email: userInput.Email,
           Date: userInput.Date,
           Text: userInput.Text
        );

        _collection.InsertOne(suggestion);

        return suggestion;
    }

    [HttpGet("get-by-user-id/{userId}")]
    public ActionResult<List<Suggestion>> Get(string userId)
    {
        List<Suggestion> suggestions = _collection.Find(suggestion => suggestion.UserId == userId).ToList();

        if (suggestions is null)
        {
            return NotFound("No suggestion with this user id was found.");
        }

        return suggestions;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Suggestion>> GetAll()
    {
        List<Suggestion> suggestions = _collection.Find<Suggestion>(new BsonDocument()).ToList();

        if (!suggestions.Any())
        {
            return Ok("Your suggestionlist is empty.");
        }

        return suggestions;
    }
}