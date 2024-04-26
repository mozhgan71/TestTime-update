namespace api.Repositoreis;

public class UserQuestionRepository : IUserQuestionRepository
{
    private readonly IMongoCollection<Question> _collection;
    private const string _collectionName = "user-questions";

    public UserQuestionRepository(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var database = client.GetDatabase(dbSettings.DatabaseName);
        _collection = database.GetCollection<Question>(_collectionName);
    }

    public async Task<Question> CreateAsync(QuestionDto userInput, CancellationToken cancellationToken)
    {
        Question question = new Question(
         Id: null,
          FeildName: userInput.FeildName.ToUpper().Trim(),
          NumberQuestion: userInput.NumberQuestion,
          DescriptionQuestion: userInput.DescriptionQuestion,
          Option1: userInput.Option1,
          Option2: userInput.Option2,
          Option3: userInput.Option3,
          Option4: userInput.Option4,
          CorrectAnswer: userInput.CorrectAnswer
      );

        await _collection.InsertOneAsync(question);

        return question;
    }

    public async Task<PagedList<Question>?> GetAllAsync(PaginationParams paginationParams, CancellationToken cancellationToken)
    {
        IMongoQueryable<Question> query = _collection.AsQueryable();

        return await PagedList<Question>.CreatePagedListAsync(query, paginationParams.PageNumber, paginationParams.PageSize, cancellationToken);
    }

    //  public async Task<List<Question>?> GetAllAsync(CancellationToken cancellationToken)
    // {
    //     List<Question> questions = await _collection.Find<Question>(new BsonDocument()).ToListAsync(cancellationToken);

    //     if (questions.Count != 0)
    //     {
    //         return questions;
    //     }

    //     return null;
    // }
}
