namespace api.Controllers;

public class ApiExceptionController(IApiExceptionRepository _apiExceptionRepository) : BaseApiController
{
    [HttpGet]
     public async Task<ActionResult<IEnumerable<ApiException>>> GetAll([FromQuery] PaginationParams paginationParams, CancellationToken cancellationToken)
    {
        PagedList<ApiException>? pagedApiExceptions = await _apiExceptionRepository.GetAllAsync(paginationParams, cancellationToken);

        if (pagedApiExceptions!.Count == 0) // []
            return NoContent();

        /*  1- Response only exists in Contoller. So we have to set PaginationHeader here before converting AppUser to UserDto.
        If we convert AppUser before here, we'll lose PagedList's pagination values, e.g. CurrentPage, PageSize, etc.
        */
        PaginationHeader paginationHeader = new(
            CurrentPage: pagedApiExceptions.CurrentPage,
            ItemsPerPage: pagedApiExceptions.PageSize,
            TotalItems: pagedApiExceptions.TotalItems,
            TotalPages: pagedApiExceptions.TotalPages
        );

        Response.AddPaginationHeader(paginationHeader);

        /*  2- PagedList<T> has to be AppUser first to retrieve data from DB and set pagination values. 
                After that step we can convert AppUser to MemberDto in here (NOT in the UserRepository) */

        List<ApiException> apiExceptions = [];

        foreach (ApiException apiException in pagedApiExceptions)
        {
            apiExceptions.Add(apiException);
        }

        return apiExceptions;
    }

    // public async Task<ActionResult<IEnumerable<ApiException>>> GetAll(CancellationToken cancellationToken)
    // {
    //     List<ApiException>? apiExceptions = await _apiExceptionRepository.GetAllAsync(cancellationToken);

    //     if (apiExceptions is null)
    //         return NoContent();

    //     return apiExceptions;
    // }
}
