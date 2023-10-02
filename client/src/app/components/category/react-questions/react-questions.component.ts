import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Question } from 'src/app/models/question.model';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-react-questions',
  templateUrl: './react-questions.component.html',
  styleUrls: ['./react-questions.component.scss']
})
export class ReactQuestionsComponent {
  reactQuestions: Question[] | undefined;

  resultRes: Result | undefined;

  startTime: any | null | undefined;
  endTime: any | null | undefined;
  matchTime: any | null | undefined;
  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  finalTime: number = 0;

  correctAnswers: number = 0;
  noAnswers: number = 0;
  wrongAnswers: number = 0;
  description: string | undefined;

  constructor(private http: HttpClient) { }

  showReactQuestions(): void {
    this.http.get<Question[]>('http://localhost:5000/api/question/get-by-feild-name/react').subscribe(
      { next: response => this.reactQuestions = response }
    );

    var end = document.getElementById("end");
    end!.hidden = false;

    var text = document.getElementById("text");
    text!.hidden = true;

    this.startTime = new Date();
  }

  calcResultReact(): void {
    var question1 = document.getElementsByName("1") as NodeListOf<HTMLInputElement>;
    for (var i = 0; i < question1.length; i++) {
      if (question1[i].checked == true) {
        if ((parseInt(question1[i].value)) == 1) {
          this.correctAnswers++;
          break;
        }
        else {
          this.wrongAnswers++;
        }
      }
    }

    var question2 = document.getElementsByName("2") as NodeListOf<HTMLInputElement>;
    for (var i = 0; i < question2.length; i++) {
      if (question2[i].checked == true) {
        if ((parseInt(question2[i].value)) == 2) {
          this.correctAnswers++;
          break;
        }
        else {
          this.wrongAnswers++;
        }
      }
    }

    var question3 = document.getElementsByName("3") as NodeListOf<HTMLInputElement>;
    for (var i = 0; i < question3.length; i++) {
      if (question3[i].checked == true) {
        if ((parseInt(question3[i].value)) == 1) {
          this.correctAnswers++;
          break;
        }
        else {
          this.wrongAnswers++;
        }
      }
    }

    var question4 = document.getElementsByName("4") as NodeListOf<HTMLInputElement>;
    for (var i = 0; i < question3.length; i++) {
      if (question4[i].checked == true) {
        if ((parseInt(question4[i].value)) == 1) {
          this.correctAnswers++;
          break;
        }
        else {
          this.wrongAnswers++;
        }
      }
    }

    var question8 = document.getElementsByName("5") as NodeListOf<HTMLInputElement>;
    for (var i = 0; i < question8.length; i++) {
      if (question8[i].checked == true) {
        if ((parseInt(question8[i].value)) == 2) {
          this.correctAnswers++;
          break;
        }
        else {
          this.wrongAnswers++;
        }
      }
    }

    var question8 = document.getElementsByName("6") as NodeListOf<HTMLInputElement>;
    for (var i = 0; i < question8.length; i++) {
      if (question8[i].checked == true) {
        if ((parseInt(question8[i].value)) == 3) {
          this.correctAnswers++;
          break;
        }
        else {
          this.wrongAnswers++;
        }
      }
    }

    var question8 = document.getElementsByName("7") as NodeListOf<HTMLInputElement>;
    for (var i = 0; i < question8.length; i++) {
      if (question8[i].checked == true) {
        if ((parseInt(question8[i].value)) == 3) {
          this.correctAnswers++;
          break;
        }
        else {
          this.wrongAnswers++;
        }
      }
    }

    var question8 = document.getElementsByName("8") as NodeListOf<HTMLInputElement>;
    for (var i = 0; i < question8.length; i++) {
      if (question8[i].checked == true) {
        if ((parseInt(question8[i].value)) == 2) {
          this.correctAnswers++;
          break;
        }
        else {
          this.wrongAnswers++;
        }
      }
    }

    var question9 = document.getElementsByName("9") as NodeListOf<HTMLInputElement>;
    for (var i = 0; i < question9.length; i++) {
      if (question9[i].checked == true) {
        if ((parseInt(question9[i].value)) == 4) {
          this.correctAnswers++;
          break;
        }
        else {
          this.wrongAnswers++;
        }
      }
    }

    var question10 = document.getElementsByName("10") as NodeListOf<HTMLInputElement>;
    for (var i = 0; i < question10.length; i++) {
      if (question10[i].checked == true) {
        if ((parseInt(question10[i].value)) == 1) {
          this.correctAnswers++;
          break;
        }
        else {
          this.wrongAnswers++;
        }
      }
    }

    this.noAnswers = (10 - (this.correctAnswers + this.wrongAnswers));

    if (this.correctAnswers == 10) {
      this.description = " .عالللللی هستی .همین قدر خوب به راهت ادامه بده دوست من ";
    }
    else if (this.correctAnswers >= 6) {
      this.description = ".خوبه ولی یه کوچولو تلاشت رو بیشتر کن دوست من";
    }
    else {
      this.description = ". متاسفانه نتیجه ی قابل قبولی نگرفتی دوست خوبم.نیاز به تلاش خیلی بیشتر داری";
    }

    console.log("تعداد پاسخ های صحیح:" + this.correctAnswers);
    console.log(" تعداد پاسخ های غلط:" + this.wrongAnswers);
    console.log("تعداد سوال های بی پاسخ:" + this.noAnswers);
  }

  calcTime(): void {
    this.endTime = new Date();
    this.matchTime = this.endTime - this.startTime;
    this.finalTime = parseInt(((this.matchTime) / 1000).toFixed(0));  //tabdil az milisanie be sanie va hazfe ashar
    if (this.finalTime >= 3600) {
      this.hour = parseInt(((this.finalTime) / 3600).toFixed(0))
    }
    else {
      this.hour = 0;
    }
    if (this.finalTime >= 60) {
      this.minute = parseInt(((this.finalTime) / 60).toFixed(0));
    }
    else {
      this.minute = 0;
    }

    this.second = (this.finalTime) % 60;

    console.log("ساعت:" + this.hour);
    console.log("دقیقه:" + this.minute);
    console.log("ثانیه:" + this.second);
  }

  goTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  addResult(): void {
    var userId = sessionStorage.getItem('user-id');

    let result: Result = {
      userId: userId!,
      testName: "react",
      myDate: new Date().toString(),
      testHour: this.hour,
      testMinute: this.minute,
      testSecond: this.second,
      numberOfCorrect: this.correctAnswers,
      numberOfWrong: this.wrongAnswers,
      numberOfNoAnswer: this.noAnswers,
      description: this.description
    }

    this.http.post<Result>('http://localhost:5000/api/result/add-result', result).subscribe(
      {
        next: res => {
          this.resultRes = res;
          console.log(res);
          if (this.resultRes) {
            var end = document.getElementById("end");
            end!.hidden = true;
            var start = document.getElementById("start");
            start!.hidden = true;
            var back = document.getElementById("back");
            back!.hidden = true;
            var end = document.getElementById("result");
            end!.hidden = false;
            sessionStorage.setItem('result-id', this.resultRes.id!);
          }
        }
      }
    );
  }
}