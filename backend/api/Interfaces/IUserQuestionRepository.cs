namespace api.Interfaces;

public interface IUserQuestionRepository
{
    public Task<Question> CreateAsync(QuestionDto userInput, CancellationToken cancellationToken);

    public Task<List<Question>?> GetAllAsync(CancellationToken cancellationToken);
}