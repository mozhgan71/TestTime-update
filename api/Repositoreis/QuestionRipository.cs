namespace api.Repositoreis;

public class QuestionRipository : IQuestionRepository
{
    private const string _collectionName = "questions";
    private readonly IMongoCollection<Question>? _collection;

    public QuestionRipository(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var database = client.GetDatabase(dbSettings.DatabaseName);
        _collection = database.GetCollection<Question>(_collectionName);
    }
    public async Task<Question?> CreateAsync(QuestionDto adminInput, CancellationToken cancellationToken)
    {
        // check if question already exists
        bool doesAccountExist = await _collection.Find<Question>(question =>
            question.DescriptionQuestion == adminInput.DescriptionQuestion.ToUpper().Trim()).AnyAsync(cancellationToken);

        if (doesAccountExist)
            return null;

        // if question does not exist, create a new Question. 
        Question question = new Question(
            Id: null,
            FeildName: adminInput.FeildName.ToUpper().Trim(),
            NumberQuestion: adminInput.NumberQuestion,
            DescriptionQuestion: adminInput.DescriptionQuestion,
            Option1: adminInput.Option1,
            Option2: adminInput.Option2,
            Option3: adminInput.Option3,
            Option4: adminInput.Option4,
            CorrectAnswer: adminInput.CorrectAnswer
        );

        if (_collection is not null)
            await _collection.InsertOneAsync(question, null, cancellationToken);

        if (question.Id is not null)
        {

            return question;
        }

        return null;
    }

    public async Task<List<QuestionDto>> GetByFeildNameAsync(string userInput, CancellationToken cancellationToken)
    {
        List<Question> questions = await _collection.Find<Question>(question => question.FeildName == userInput.ToUpper().Trim()).ToListAsync(cancellationToken);

        List<QuestionDto> questionDtos = new List<QuestionDto>();

        if (questions.Any())
        {
            foreach (Question question in questions)
            {
                QuestionDto questionDto = new QuestionDto(
                    FeildName: question.FeildName.ToUpper().Trim(),
                    NumberQuestion: question.NumberQuestion,
                    DescriptionQuestion: question.DescriptionQuestion,
                    Option1: question.Option1,
                    Option2: question.Option2,
                    Option3: question.Option3,
                    Option4: question.Option4,
                    CorrectAnswer: question.CorrectAnswer
                );

                questionDtos.Add(questionDto);
            }
            return questionDtos;
        }

        return questionDtos;
    }

    public async Task<Question?> GetByIdAsync(string questionId, CancellationToken cancellationToken)
    {
        Question question = await _collection.Find<Question>(question => question.Id == questionId).FirstOrDefaultAsync(cancellationToken);

        if (question is not null)
        {
            return question;
        }

        return null;
    }

    public async Task<List<Question>?> GetAllAsync(CancellationToken cancellationToken)
    {
        List<Question> questions = await _collection.Find<Question>(new BsonDocument()).ToListAsync(cancellationToken);

        if (questions.Any())
        {
            return questions;
        }

        return null; // []
    }

    public async Task<UpdateResult?> UpdateByIdAsync(string questionId, QuestionDto userInput, CancellationToken cancellationToken)
    {
        var updatedDoc = Builders<Question>.Update
        .Set(doc => doc.FeildName, userInput.FeildName)
        .Set(doc => doc.NumberQuestion, userInput.NumberQuestion)
        .Set(doc => doc.DescriptionQuestion, userInput.DescriptionQuestion)
        .Set(doc => doc.Option1, userInput.Option1)
        .Set(doc => doc.Option2, userInput.Option2)
        .Set(doc => doc.Option3, userInput.Option3)
        .Set(doc => doc.Option4, userInput.Option4)
        .Set(doc => doc.CorrectAnswer, userInput.CorrectAnswer);

        return await _collection.UpdateOneAsync<Question>(doc => doc.Id == questionId, updatedDoc);
    }

    public async Task<DeleteResult?> DeleteAsync(string questionId, CancellationToken cancellationToken)

    {
        return await _collection.DeleteOneAsync<Question>(doc => doc.Id == questionId);
    }
}