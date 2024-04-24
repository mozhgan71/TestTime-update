namespace api.Controllers;

public class UserQuestionController(IUserQuestionRepository _userQuestionRepository) : BaseApiController
{
    [HttpPost("add-question")]
    public async Task<ActionResult<Question>> Create(QuestionDto userInput, CancellationToken cancellationToken)
    {
        Question? question = await _userQuestionRepository.CreateAsync(userInput, cancellationToken);

        if (question is null)
            return BadRequest("question is duplicate.");

        return question;
    }

    [HttpGet]
     public async Task<ActionResult<IEnumerable<Question>>> GetAll([FromQuery] PaginationParams paginationParams, CancellationToken cancellationToken)
    {
        PagedList<Question>? pagedQuestion = await _userQuestionRepository.GetAllAsync(paginationParams, cancellationToken);

        if (pagedQuestion!.Count == 0) // []
            return NoContent();

        /*  1- Response only exists in Contoller. So we have to set PaginationHeader here before converting AppUser to UserDto.
        If we convert AppUser before here, we'll lose PagedList's pagination values, e.g. CurrentPage, PageSize, etc.
        */
        PaginationHeader paginationHeader = new(
            CurrentPage: pagedQuestion.CurrentPage,
            ItemsPerPage: pagedQuestion.PageSize,
            TotalItems: pagedQuestion.TotalItems,
            TotalPages: pagedQuestion.TotalPages
        );

        Response.AddPaginationHeader(paginationHeader);

        /*  2- PagedList<T> has to be AppUser first to retrieve data from DB and set pagination values. 
                After that step we can convert AppUser to MemberDto in here (NOT in the UserRepository) */

        List<Question> questions = [];

        foreach (Question question in pagedQuestion)
        {
            questions.Add(question);
        }

        return questions;
    }

    // public async Task<ActionResult<IEnumerable<Question>>> GetAll(CancellationToken cancellationToken)
    // {
    //     List<Question>? questions = await _userQuestionRepository.GetAllAsync(cancellationToken);

    //     if (questions is null)
    //         return NoContent();

    //     return questions;
    // }
}