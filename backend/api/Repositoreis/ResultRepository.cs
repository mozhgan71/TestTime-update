namespace api.Repositoreis;

public class ResultRepository : IResultRepository
{
    private readonly IMongoCollection<Result> _collection;
    private const string _collectionName = "results";

    public ResultRepository(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var database = client.GetDatabase(dbSettings.DatabaseName);
        _collection = database.GetCollection<Result>(_collectionName);
    }

    public async Task<Result?> CreateAsync(ResultInputDto userInput, CancellationToken cancellationToken)
    {

        Result result = new Result(
            Id: null,
            UserId: userInput.UserId,
            TestName: userInput.TestName.ToUpper().Trim(),
            MyDate: userInput.MyDate,
            TestHour: userInput.TestHour,
            TestMinute: userInput.TestMinute,
            TestSecond: userInput.TestSecond,
            NumberOfCorrect: userInput.NumberOfCorrect,
            NumberOfWrong: userInput.NumberOfWrong,
            NumberOfNoAnswer: userInput.NumberOfNoAnswer,
            Description: userInput.Description
         );

        await _collection.InsertOneAsync(result);

        return result;
    }

    public async Task<List<Result>?> GetByUserIdAsync(string userId, CancellationToken cancellationToken)
    {
        List<Result> results = await _collection.Find<Result>(result => result.UserId == userId).ToListAsync(cancellationToken);

        if (results is null)
            return null;

        return results;
    }

    public async Task<Result?> GetByIdAsync(string resultId, CancellationToken cancellationToken)
    {
        Result result = await _collection.Find<Result>(result => result.Id == resultId).FirstOrDefaultAsync(cancellationToken);

        if (result is null)
            return null;

        return result;
    }

    public async Task<List<Result>?> GetByTestNameAsync(string testName, CancellationToken cancellationToken)
    {
        List<Result> results = await _collection.Find<Result>(result => result.TestName == testName).ToListAsync(cancellationToken);

        if (results is null)
            return null;

        return results;
    }

    public async Task<List<Result>?> GetAllAsync(CancellationToken cancellationToken)
    {
        List<Result> results = await _collection.Find<Result>(new BsonDocument()).ToListAsync(cancellationToken);

        if (results.Count != 0)
        {
            return results;
        }

        return null;
    }

    public async Task<DeleteResult?> DeleteAsync(string resultId, CancellationToken cancellationToken)

    {
        return await _collection.DeleteOneAsync<Result>(doc => doc.Id == resultId);
    }
}
