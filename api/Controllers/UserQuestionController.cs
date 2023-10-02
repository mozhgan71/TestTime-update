using api.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using api.Settings;
using MongoDB.Bson;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserQuestionController : ControllerBase
{
    private readonly IMongoCollection<Question> _collection;

    public UserQuestionController(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<Question>("user-questions");
    }

    [HttpPost("add-question")]
    public ActionResult<Question> Create(Question userInput)
    {
        bool hasDocs = _collection.AsQueryable().Where<Question>(q => q.DescriptionQuestion == userInput.DescriptionQuestion.ToLower().Trim()).Any();

        if (hasDocs)
            return BadRequest("The entered question is duplicate.");
        {
            Question question = new Question(
               Id: null,
               FeildName: userInput.FeildName.ToLower().Trim(),
               NumberQuestion: userInput.NumberQuestion,
               DescriptionQuestion: userInput.DescriptionQuestion,
               Option1: userInput.Option1,
               Option2: userInput.Option2,
               Option3: userInput.Option3,
               Option4: userInput.Option4,
               CorrectAnswer: userInput.CorrectAnswer
            );

            _collection.InsertOne(question);

            return question;
        }
    }

    [HttpGet]
    public ActionResult<IEnumerable<Question>> GetAll()
    {
        List<Question> questions = _collection.Find<Question>(new BsonDocument()).ToList();

        if (!questions.Any())
        {
            return Ok("Your suggestionlist is empty.");
        }

        return questions;
    }
}