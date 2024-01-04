namespace api.Repositoreis;

public class SuggestionRepository : ISuggestionRepository
{
    private const string _collectionName = "suggestions";
    private readonly IMongoCollection<Suggestion> _collection;

    public SuggestionRepository(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var database = client.GetDatabase(dbSettings.DatabaseName);
        _collection = database.GetCollection<Suggestion>(_collectionName);
    }

    public async Task<Suggestion> CreateAsync(SuggestionDto userInput, CancellationToken cancellationToken)
    {

        Suggestion suggestion = new Suggestion(
         Id: null,
         UserId: userInput.UserId,
         FullName: userInput.FullName,
         Email: userInput.Email,
         Date: userInput.Date,
         Text: userInput.Text
      );

        await _collection.InsertOneAsync(suggestion);

        return suggestion;
    }

    public async Task<List<Suggestion>?> GetAllAsync(CancellationToken cancellationToken)
    {
        List<Suggestion> suggestions = await _collection.Find<Suggestion>(new BsonDocument()).ToListAsync(cancellationToken);

        if (suggestions.Count != 0)
        {
            return suggestions;
        }

        return null;
    }

    public async Task<List<Suggestion>?> GetByUserIdAsync(string userId, CancellationToken cancellationToken)
    {
        List<Suggestion> suggestions = await _collection.Find<Suggestion>(doc => doc.UserId == userId).ToListAsync(cancellationToken);

        if (suggestions.Count != 0)
        {
            return suggestions;
        }

        return null;
    }
}
