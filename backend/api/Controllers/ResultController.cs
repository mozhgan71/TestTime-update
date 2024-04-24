namespace api.Controllers;

[Authorize]
public class ResultController(IResultRepository _resultRepository) : BaseApiController
{
    [HttpPost("add-result")]
    public async Task<ActionResult<Result>> Create(ResultInputDto userInput, CancellationToken cancellationToken)
    {
        Result? result = await _resultRepository.CreateAsync(userInput, cancellationToken);

        if (result is null)
            return BadRequest("result is duplicate.");

        return result;
    }

    [HttpGet("get-by-user-id/{userId}")]
    public async Task<ActionResult<IEnumerable<Result>>> GetByUserId(string userId, [FromQuery] PaginationParams paginationParams, CancellationToken cancellationToken)
    {
        PagedList<Result>? pagedResult= await _resultRepository.GetByUserIdAsync(userId, paginationParams, cancellationToken);

        if (pagedResult!.Count == 0) // []
            return NoContent();

        /*  1- Response only exists in Contoller. So we have to set PaginationHeader here before converting AppUser to UserDto.
        If we convert AppUser before here, we'll lose PagedList's pagination values, e.g. CurrentPage, PageSize, etc.
        */
        PaginationHeader paginationHeader = new(
            CurrentPage: pagedResult.CurrentPage,
            ItemsPerPage: pagedResult.PageSize,
            TotalItems: pagedResult.TotalItems,
            TotalPages: pagedResult.TotalPages
        );

        Response.AddPaginationHeader(paginationHeader);

        /*  2- PagedList<T> has to be AppUser first to retrieve data from DB and set pagination values. 
                After that step we can convert AppUser to MemberDto in here (NOT in the UserRepository) */

        List<Result> results = [];

        foreach (Result result in pagedResult)
        {
            results.Add(result);
        }

        return results;
    }
    // public async Task<ActionResult<IEnumerable<Result>>> GetByUserId(string userId, CancellationToken cancellationToken)
    // {
    //     List<Result>? results = await _resultRepository.GetByUserIdAsync(userId, cancellationToken);

    //     if (results is null)
    //     {
    //         return NotFound("No result with this user id was found.");
    //     }

    //     return results;
    // }

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