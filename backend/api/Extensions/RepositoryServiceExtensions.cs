namespace api.Extensions;

public static class RepositoryServiceExtensions
{
    public static IServiceCollection AddRepositoryServices(this IServiceCollection services)
    {
        #region Dependency Injections
        // builder.Services.AddSingleton<IAdminRepository, AdminRepository>(); App LifeCycle
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IAdminRepository, AdminRepository>(); // Controller LifeCycle
        services.AddScoped<IAccountRepository, AccountRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IQuestionRepository, QuestionRipository>();
        services.AddScoped<IResultRepository, ResultRepository>();
        services.AddScoped<ISuggestionRepository, SuggestionRepository>();
        services.AddScoped<IUserQuestionRepository, UserQuestionRepository>();
        services.AddScoped<IMemberRepository, MemberRepository>();
        services.AddScoped<IPhotoService, PhotoService>();
        services.AddScoped<IPhotoModifySaveService, PhotoModifySaveService>();
        services.AddScoped<IApiExceptionRepository, ApiExceptionRepository>();

        #endregion Dependency Injections

        return services;
    }
}
