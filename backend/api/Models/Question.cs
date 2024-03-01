namespace api.Models;

public record Question(
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
    [Length(1, 15)] string FeildName,
    [Range(1, 10)] int? NumberQuestion,
    [MinLength(10)]string DescriptionQuestion,
    string Option1,
    string Option2,
    string Option3,
    string Option4,
    [Range(1, 4)] int CorrectAnswer
);