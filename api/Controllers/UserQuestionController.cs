namespace api.Controllers;

public class UserQuestionController : BaseApiController
{
    private readonly IUserQuestionRepository _userQuestionRepository;

    public UserQuestionController(IUserQuestionRepository userQuestionRepository)
    {
        _userQuestionRepository = userQuestionRepository;
    }

    [HttpPost("add-question")]
    public async Task<ActionResult<Question>> Create(QuestionDto userInput, CancellationToken cancellationToken)
    {
        Question? question = await _userQuestionRepository.CreateAsync(userInput, cancellationToken);

        if (question is null)
            return BadRequest("question is duplicate.");

        return question;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Question>>> GetAll(CancellationToken cancellationToken)
    {
        List<Question>? questions = await _userQuestionRepository.GetAllAsync(cancellationToken);

        if (questions is null)
            return NoContent();

        return questions;
    }
}