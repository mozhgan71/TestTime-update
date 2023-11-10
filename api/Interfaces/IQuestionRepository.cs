namespace api.Interfaces;

public interface IQuestionRepository
{
    public Task<Question?> CreateAsync(QuestionDto adminInput, CancellationToken cancellationToken);

    public Task<List<QuestionDto>> GetByFeildNameAsync(string userInput, CancellationToken cancellationToken);

    public Task<Question?> GetByIdAsync(string questionId, CancellationToken cancellationToken);

    public Task<List<Question>?> GetAllAsync(CancellationToken cancellationToken);

    public Task<UpdateResult?> UpdateByIdAsync(string questionId, QuestionDto userInput, CancellationToken cancellationToken);

    public Task<DeleteResult?> DeleteAsync(string questionId, CancellationToken cancellationToken);
}
