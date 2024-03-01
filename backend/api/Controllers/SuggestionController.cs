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
    public async Task<ActionResult<IEnumerable<Suggestion>>> GetAll(CancellationToken cancellationToken)
    {
        List<Suggestion>? suggestions = await _suggestionRepository.GetAllAsync(cancellationToken);

        if (suggestions is null)
            return NoContent();

        return suggestions;
    }

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