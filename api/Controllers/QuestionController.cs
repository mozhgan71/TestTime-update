using api.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using api.Settings;
using MongoDB.Bson;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuestionController : ControllerBase
{
    private readonly IMongoCollection<Question> _collection;

    public QuestionController(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<Question>("questions");
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

    [HttpGet("get-by-feild-name/{userInput}")]
    public ActionResult<List<Question>> GetByFeild(string userInput)
    {
        List<Question> questions = _collection.Find(question => question.FeildName == userInput.ToLower().Trim()).ToList();

        if (questions is null)
        {
            return NotFound("No question with this feild name was found.");
        }

        return questions;
    }

    [HttpGet("get-by-id/{userInput}")]
    public ActionResult<Question> GetById(string userInput)
    {
        Question question = _collection.Find(question => question.Id == userInput.Trim()).FirstOrDefault();

        if (question is null)
        {
            return NotFound("No question with this id was found.");
        }

        return question;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Question>> GetAll()
    {
        List<Question> questions = _collection.Find<Question>(new BsonDocument()).ToList();

        if (!questions.Any())
        {
            return Ok("Your questionlist is empty.");
        }

        return questions;
    }

    [HttpPut("update/{questionId}")]
    public ActionResult<UpdateResult> UpdateQuestionById(string questionId, Question adminIn)
    {
        var updatedDoc = Builders<Question>.Update
        .Set(doc => doc.FeildName, adminIn.FeildName)
        .Set(doc => doc.NumberQuestion, adminIn.NumberQuestion)
        .Set(doc => doc.DescriptionQuestion, adminIn.DescriptionQuestion)
        .Set(doc => doc.Option1, adminIn.Option1)
        .Set(doc => doc.Option2, adminIn.Option2)
        .Set(doc => doc.Option3, adminIn.Option3)
        .Set(doc => doc.Option4, adminIn.Option4)
        .Set(doc => doc.CorrectAnswer, adminIn.CorrectAnswer);

        return _collection.UpdateOne<Question>(doc => doc.Id == questionId, updatedDoc);
    }

    [HttpDelete("delete/{questionId}")]
    public ActionResult<DeleteResult> Delete(string questionId)
    {
        return _collection.DeleteOne<Question>(doc => doc.Id == questionId);
    }
}