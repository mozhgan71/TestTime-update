namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]

[Authorize]
public class MemberController(IMemberRepository _memberRepository) : BaseApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetAll(CancellationToken cancellationToken)
    {
        List<MemberDto> memberDtos = await _memberRepository.GetAllAsync(cancellationToken);

        if (memberDtos.Count == 0) // []
            return NoContent();

        return memberDtos;
    }

     [HttpGet("get-by-id/{memberId}")]
    public async Task<ActionResult<MemberDto>> GetById(string memberId, CancellationToken cancellationToken)
    {
        MemberDto? memberDto = await _memberRepository.GetByIdAsync(memberId, cancellationToken);

        if (memberDto is null)
            return NotFound("No user with this ID");

        return memberDto;
    }

       [HttpGet("get-by-email/{memberEmail}")]
    public async Task<ActionResult<MemberDto>> GetByEmail(string memberEmail, CancellationToken cancellationToken)
    {
        MemberDto? memberDto = await _memberRepository.GetByEmailAsync(memberEmail, cancellationToken);

        if (memberDto is null)
            return NotFound("No user with this email address");

        return memberDto;
    }
}
