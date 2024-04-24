namespace api.Controllers;

public class SuggestionController(ISuggestionRepository _suggestionRepository) : BaseApiController
{
    [HttpPost("add-suggestion")]
    public async Task<ActionResult<Suggestion>> Create(SuggestionDto userInput, CancellationToken cancellationToken)
    {
        Suggestion? suggestion = await _suggestionRepository.CreateAsync(userInput, cancellationToken);

        if (suggestion is null)
            return BadRequest("suggestion is duplicate.");

        return suggestion;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Suggestion>>> GetAll([FromQuery] PaginationParams paginationParams, CancellationToken cancellationToken)
    {
        PagedList<Suggestion>? pagedSuggestion = await _suggestionRepository.GetAllAsync(paginationParams, cancellationToken);

        if (pagedSuggestion!.Count == 0) // []
            return NoContent();

        /*  1- Response only exists in Contoller. So we have to set PaginationHeader here before converting AppUser to UserDto.
        If we convert AppUser before here, we'll lose PagedList's pagination values, e.g. CurrentPage, PageSize, etc.
        */
        PaginationHeader paginationHeader = new(
            CurrentPage: pagedSuggestion.CurrentPage,
            ItemsPerPage: pagedSuggestion.PageSize,
            TotalItems: pagedSuggestion.TotalItems,
            TotalPages: pagedSuggestion.TotalPages
        );

        Response.AddPaginationHeader(paginationHeader);

        /*  2- PagedList<T> has to be AppUser first to retrieve data from DB and set pagination values. 
                After that step we can convert AppUser to MemberDto in here (NOT in the UserRepository) */

        List<Suggestion> suggestions = [];

        foreach (Suggestion suggestion in pagedSuggestion)
        {
            suggestions.Add(suggestion);
        }

        return suggestions;
    }
    
    // public async Task<ActionResult<IEnumerable<Suggestion>>> GetAll(CancellationToken cancellationToken)
    // {
    //     List<Suggestion>? suggestions = await _suggestionRepository.GetAllAsync(cancellationToken);

    //     if (suggestions is null)
    //         return NoContent();

    //     return suggestions;
    // }

    [HttpGet("get-by-user-id/{userId}")]
    public async Task<ActionResult<IEnumerable<Suggestion>>> GetByUserId(string userId, CancellationToken cancellationToken)
    {
        List<Suggestion>? suggestions = await _suggestionRepository.GetByUserIdAsync(userId, cancellationToken);

        if (suggestions is null)
        {
            return NotFound("No suggestion with this user id was found.");
        }

        return suggestions;
    }
}