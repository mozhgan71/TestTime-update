namespace api.Controllers;

public class QuestionController : BaseApiController
{
    // private readonly ITokenService _tokenService; // save user credential as a token
    private readonly IQuestionRepository _questionRepository;

    // constructor - dependency injection
    public QuestionController(IQuestionRepository questionRepository)
    {
        _questionRepository = questionRepository;
    }

    [HttpPost("add-question")]
    public async Task<ActionResult<Question>> Create(QuestionDto adminInput, CancellationToken cancellationToken)
    {
        Question? question = await _questionRepository.CreateAsync(adminInput, cancellationToken);

        if (question is null)
            return BadRequest("question is duplicate.");

        return question;
    }

    [HttpGet("get-by-feild-name/{userInput}")]
    public async Task<ActionResult<IEnumerable<QuestionDto>>> GetByFeildNmae(string userInput, CancellationToken cancellationToken)
    {
        List<QuestionDto> questionDtos = await _questionRepository.GetByFeildNameAsync(userInput, cancellationToken);

        if (!questionDtos.Any()) // []
            return NoContent();

        return questionDtos;
    }

    [HttpGet("get-by-id/{questionId}")]
    public async Task<ActionResult<Question>> GetById(string questionId, CancellationToken cancellationToken)
    {
        Question? question = await _questionRepository.GetByIdAsync(questionId, cancellationToken);

        if (question is null)
        {
            return NotFound("No question was found");
        }

        return question;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Question>>> GetAll(CancellationToken cancellationToken)
    {
        List<Question>? questions = await _questionRepository.GetAllAsync(cancellationToken);

        if (questions is null) // []
            return NoContent();

        return questions;
    }

    [HttpPut("update/{questionId}")]
    public async Task<ActionResult<UpdateResult?>> Update(string questionId, QuestionDto userInput, CancellationToken cancellationToken)
    {
        return await _questionRepository.UpdateByIdAsync(questionId, userInput, cancellationToken);
    }

    [HttpDelete("delete/{questionId}")]
    public async Task<ActionResult<DeleteResult?>> Delete(string questionId, CancellationToken cancellationToken)
    {
        return await _questionRepository.DeleteAsync(questionId, cancellationToken);
    }
}



// [HttpGet("get-by-feild-name/{userInput}")]
// public ActionResult<List<Question>> GetByFeild(string userInput)
// {
//     List<Question> questions = _collection.Find(question => question.FeildName == userInput.ToLower().Trim()).ToList();

//     if (questions is null)
//     {
//         return NotFound("No question with this feild name was found.");
//     }

//     return questions;
// }

// [HttpGet("get-by-id/{userInput}")]
// public ActionResult<Question> GetById(string userInput)
// {
//     Question question = _collection.Find(question => question.Id == userInput.Trim()).FirstOrDefault();

//     if (question is null)
//     {
//         return NotFound("No question with this id was found.");
//     }

//     return question;
// }

// [HttpGet]
// public ActionResult<IEnumerable<Question>> GetAll()
// {
//     List<Question> questions = _collection.Find<Question>(new BsonDocument()).ToList();

//     if (!questions.Any())
//     {
//         return Ok("Your questionlist is empty.");
//     }

//     return questions;
// }

// [HttpPut("update/{questionId}")]
// public ActionResult<UpdateResult> UpdateQuestionById(string questionId, Question adminIn)
// {
//     var updatedDoc = Builders<Question>.Update
//     .Set(doc => doc.FeildName, adminIn.FeildName)
//     .Set(doc => doc.NumberQuestion, adminIn.NumberQuestion)
//     .Set(doc => doc.DescriptionQuestion, adminIn.DescriptionQuestion)
//     .Set(doc => doc.Option1, adminIn.Option1)
//     .Set(doc => doc.Option2, adminIn.Option2)
//     .Set(doc => doc.Option3, adminIn.Option3)
//     .Set(doc => doc.Option4, adminIn.Option4)
//     .Set(doc => doc.CorrectAnswer, adminIn.CorrectAnswer);

//     return _collection.UpdateOne<Question>(doc => doc.Id == questionId, updatedDoc);
// }

// [HttpDelete("delete/{questionId}")]
// public ActionResult<DeleteResult> Delete(string questionId)
// {
//     return _collection.DeleteOne<Question>(doc => doc.Id == questionId);
// }
