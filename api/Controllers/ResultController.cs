namespace api.Controllers;

public class ResultController : BaseApiController
{
    private readonly IResultRepository _resultRepository;
    public ResultController(IResultRepository resultRepository)
    {
        _resultRepository = resultRepository;
    }

    [HttpPost("add-result")]
    public async Task<ActionResult<Result>> Create(ResultInputDto userInput, CancellationToken cancellationToken)
    {
        Result? result = await _resultRepository.CreateAsync(userInput, cancellationToken);

        if (result is null)
            return BadRequest("result is duplicate.");

        return result;
    }

    [HttpGet("get-by-user-id/{userId}")]
    public async Task<ActionResult<IEnumerable<Result>>> GetByUserId(string userId, CancellationToken cancellationToken)
    {
        List<Result>? results = await _resultRepository.GetByUserIdAsync(userId, cancellationToken);

        if (results is null)
        {
            return NotFound("No result with this user id was found.");
        }

        return results;
    }

    [HttpGet("get-by-id/{resultId}")]
    public async Task<ActionResult<Result>> GetById(string resultId, CancellationToken cancellationToken)
    {
        Result? result = await _resultRepository.GetByIdAsync(resultId, cancellationToken);

        if (result is null)
        {
            return NotFound("No result with this result id was found.");
        }

        return result;
    }

    [HttpGet("get-by-test-name/{testName}")]
    public async Task<ActionResult<List<Result>>> GetByTestName(string testName, CancellationToken cancellationToken)
    {
        List<Result>? results = await _resultRepository.GetByTestNameAsync(testName, cancellationToken);

        if (results is null)
        {
            return NotFound("No result with this testname was found.");
        }

        return results;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Result>>> GetAll(CancellationToken cancellationToken)
    {
        List<Result>? results = await _resultRepository.GetAllAsync(cancellationToken);

        if (results is null)
            return NoContent();

        return results;
    }

    [HttpDelete("delete/{resultId}")]
    public async Task<ActionResult<DeleteResult?>> Delete(string resultId, CancellationToken cancellationToken)
    {
        return await _resultRepository.DeleteAsync(resultId, cancellationToken);
    }
}