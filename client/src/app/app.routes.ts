import { Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LogInComponent } from './components/account/login/login.component';
import { SignUpComponent } from './components/account/signup/signup.component';
import { AddQuestionComponent } from './components/adminn/add-question/add-question.component';
import { AdminLogInComponent } from './components/adminn/admin-login/admin-login.component';
import { AdminProfileComponent } from './components/adminn/adminprofile/adminprofile.component';
import { EditQuestionComponent } from './components/adminn/edit-question/edit-question.component';
import { ListQuestionsComponent } from './components/adminn/list-questions/list-questions.component';
import { ListSuggestionsComponent } from './components/adminn/list-suggestions/list-suggestions.component';
import { ListUserQuestionsComponent } from './components/adminn/list-userquestions/list-userquestions.component';
import { ListUsersComponent } from './components/adminn/list-users/list-users.component';
import { AngularQuestionsComponent } from './components/category/angularquestions/angularquestions.component';
import { CplusQuestionsComponent } from './components/category/cplus-questions/cplus-questions.component';
import { CsharpQuestionsComponent } from './components/category/csharp-questions/csharp-questions.component';
import { CssQuestionsComponent } from './components/category/css-questions/css-questions.component';
import { HtmlQuestionsComponent } from './components/category/html-questions/html-questions.component';
import { JavaScriptQuestionsComponent } from './components/category/javascript-questions/javascript-questions.component';
import { MongoDBQuestionsComponent } from './components/category/mongodb-questions/mongodb-questions.component';
import { OracleQuestionsComponent } from './components/category/oracle-questions/oracle-questions.component';
import { PhpQuestionsComponent } from './components/category/php-questions/php-questions.component';
import { PythonQuestionsComponent } from './components/category/python-questions/python-questions.component';
import { ReactQuestionsComponent } from './components/category/react-questions/react-questions.component';
import { ShowResultComponent } from './components/category/show-result/show-result.component';
import { SqlServerQuestionsComponent } from './components/category/sqlserver-questions/sqlserver-questions.component';
import { TestCategoryComponent } from './components/category/test-category/test-category.component';
import { TypeScriptQuestionsComponent } from './components/category/typescript-questions/typescript-questions.component';
import { VuejsQuestionsComponent } from './components/category/vuejs-questions/vuejs-questions.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { IntroduceToFriendsComponent } from './components/introduce-to-friends/introduce-to-friends.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { OldQuestionsComponent } from './components/old-questions/old-questions.component';
import { ReferencesComponent } from './components/references/references.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { CompareInAngularComponent } from './components/user/compare-with-other/compare-in-angular/compare-in-angular.component';
import { CompareInCplusComponent } from './components/user/compare-with-other/compare-in-cplus/compare-in-cplus.component';
import { CompareInCsharpComponent } from './components/user/compare-with-other/compare-in-csharp/compare-in-csharp.component';
import { CompareInCssComponent } from './components/user/compare-with-other/compare-in-css/compare-in-css.component';
import { CompareInHtmlComponent } from './components/user/compare-with-other/compare-in-html/compare-in-html.component';
import { CompareInJavaScriptComponent } from './components/user/compare-with-other/compare-in-javascript/compare-in-javascript.component';
import { CompareInMongodbComponent } from './components/user/compare-with-other/compare-in-mongodb/compare-in-mongodb.component';
import { CompareInOracleComponent } from './components/user/compare-with-other/compare-in-oracle/compare-in-oracle.component';
import { CompareInPhpComponent } from './components/user/compare-with-other/compare-in-php/compare-in-php.component';
import { CompareInPythonComponent } from './components/user/compare-with-other/compare-in-python/compare-in-python.component';
import { CompareInReactComponent } from './components/user/compare-with-other/compare-in-react/compare-in-react.component';
import { CompareInSqlServerComponent } from './components/user/compare-with-other/compare-in-sqlserver/compare-in-sqlserver.component';
import { CompareInTypescriptComponent } from './components/user/compare-with-other/compare-in-typescript/compare-in-typescript.component';
import { CompareInVuejsComponent } from './components/user/compare-with-other/compare-in-vuejs/compare-in-vuejs.component';
import { CompareComponent } from './components/user/compare-with-other/compare/compare.component';
import { CorrectAnswersComponent } from './components/user/correct-answers/correct-answers.component';
import { CreateQustionComponent } from './components/user/create-qustion/create-qustion.component';
import { EditComponent } from './components/user/edit/edit.component';
import { ResultsComponent } from './components/user/results/results.component';
import { SuggestionComponent } from './components/user/suggestion/suggestion.component';
import { UserProfileComponent } from './components/user/userprofile/userprofile.component';
import { ServerErrorComponent } from './components/errors/server-error/server-error.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { authGuard } from './guards/auth.guard';
import { authLoggedInGuard } from './guards/auth-logged-in.guard';
import { NoAccessComponent } from './components/errors/no-access/no-access.component';
import { UserPhotoEditComponent } from './components/user/user-photo-edit/user-photo-edit.component';

export const routes: Routes = [
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'members', component: MemberListComponent },
            { path: 'test-category', component: TestCategoryComponent },
            { path: 'user-profile', component: UserProfileComponent },
            { path: 'no-access', component: NoAccessComponent },
            { path: 'user-photo-edit', component: UserPhotoEditComponent }
        ]
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authLoggedInGuard],
        children: [
            { path: 'sign-up', component: SignUpComponent },
            { path: 'login', component: LogInComponent },
        ]
    },
    { path: '', component: MainComponent },
    { path: 'home', component: MainComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
    { path: 'introduce-to-friends', component: IntroduceToFriendsComponent },
    { path: 'references', component: ReferencesComponent },
    { path: 'admin-profile', component: AdminProfileComponent },
    { path: 'list-users', component: ListUsersComponent },  //canActivate: [authGuard]
    { path: 'list-questions', component: ListQuestionsComponent },
    { path: 'admin-login', component: AdminLogInComponent },
    { path: 'edit', component: EditComponent },
    { path: 'result', component: ResultsComponent },
    { path: 'suggestion', component: SuggestionComponent },
    { path: 'create-question', component: CreateQustionComponent },
    { path: 'correct-answer', component: CorrectAnswersComponent },
    { path: 'compare', component: CompareComponent },
    { path: 'list-suggestions', component: ListSuggestionsComponent },
    { path: 'list-userquestions', component: ListUserQuestionsComponent },
    { path: 'angular-question', component: AngularQuestionsComponent },
    { path: 'csharp-question', component: CsharpQuestionsComponent },
    { path: 'cplus-question', component: CplusQuestionsComponent },
    { path: 'css-question', component: CssQuestionsComponent },
    { path: 'html-question', component: HtmlQuestionsComponent },
    { path: 'mongodb-question', component: MongoDBQuestionsComponent },
    { path: 'javascript-question', component: JavaScriptQuestionsComponent },
    { path: 'sqlserver-question', component: SqlServerQuestionsComponent },
    { path: 'oracle-question', component: OracleQuestionsComponent },
    { path: 'php-question', component: PhpQuestionsComponent },
    { path: 'python-question', component: PythonQuestionsComponent },
    { path: 'react-question', component: ReactQuestionsComponent },
    { path: 'typescript-question', component: TypeScriptQuestionsComponent },
    { path: 'vuejs-question', component: VuejsQuestionsComponent },
    { path: 'compare-angular', component: CompareInAngularComponent },
    { path: 'compare-csharp', component: CompareInCsharpComponent },
    { path: 'compare-html', component: CompareInHtmlComponent },
    { path: 'compare-cplus', component: CompareInCplusComponent },
    { path: 'compare-css', component: CompareInCssComponent },
    { path: 'compare-mongo', component: CompareInMongodbComponent },
    { path: 'compare-javascript', component: CompareInJavaScriptComponent },
    { path: 'compare-sqlserver', component: CompareInSqlServerComponent },
    { path: 'compare-oracle', component: CompareInOracleComponent },
    { path: 'compare-php', component: CompareInPhpComponent },
    { path: 'compare-python', component: CompareInPythonComponent },
    { path: 'compare-react', component: CompareInReactComponent },
    { path: 'compare-typescript', component: CompareInTypescriptComponent },
    { path: 'compare-vuejs', component: CompareInVuejsComponent },
    { path: 'add-question', component: AddQuestionComponent },
    { path: 'edit-question', component: EditQuestionComponent },
    { path: 'show-result', component: ShowResultComponent },
    { path: 'old-question', component: OldQuestionsComponent },
    { path: 'server-error', component: ServerErrorComponent },
    { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];