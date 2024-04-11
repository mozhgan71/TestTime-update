namespace api.Controllers;

public class ApiExceptionController(IApiExceptionRepository _apiExceptionRepository) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ApiException>>> GetAll(CancellationToken cancellationToken)
    {
        List<ApiException>? apiExceptions = await _apiExceptionRepository.GetAllAsync(cancellationToken);

        if (apiExceptions is null)
            return NoContent();

        return apiExceptions;
    }
}
