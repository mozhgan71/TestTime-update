import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { Question } from '../../../models/question.model';
import { Result } from '../../../models/result.model';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, interval } from 'rxjs';
import { Entry } from '../../../models/entry.model';
import { TimeSpan } from '../../../models/timespan.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-cplus-questions',
  templateUrl: './cplus-questions.component.html',
  styleUrls: ['./cplus-questions.component.scss'],
  imports: [RouterModule, CommonModule, MatRadioModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CplusQuestionsComponent implements OnDestroy {
  constructor(private changeDetector: ChangeDetectorRef) { }

  entries: Entry[] = [];
  newId!: string | null;

  private destroyed$ = new Subject();

  ngOnDestroy() {
    // this.destroyed$.next(undefined);
    this.destroyed$.complete();
  }

  addEntry() {
    this.entries.push({
      created: new Date(),
      id: this.newId!
    });
    this.newId = '';
  }

  getElapsedTime(entry: Entry): TimeSpan {
    let totalSeconds = Math.floor((new Date().getTime() - entry.created.getTime()) / 1000);

    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (totalSeconds >= 3600) {
      hours = Math.floor(totalSeconds / 3600);
      totalSeconds -= 3600 * hours;
    }

    if (totalSeconds >= 60) {
      minutes = Math.floor(totalSeconds / 60);
      totalSeconds -= 60 * minutes;
    }

    seconds = totalSeconds;

    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  private readonly baseApiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  cplusQuestions: Question[] | undefined;

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

  showCplusQuestion(): void {
    this.http.get<Question[]>(this.baseApiUrl + 'question/get-by-feild-name/c++').subscribe(
      {
        next: response => {
          if (response) {
            this.cplusQuestions = response;

            var end = document.getElementById("end");
            end!.hidden = false;

            var text = document.getElementById("text");
            text!.hidden = true;

            this.startTime = new Date();

            this.newId = 'first';
            this.addEntry();
        
            interval(1000).subscribe(() => {
              // if (!this.changeDetector['destroyed']) {
              this.changeDetector.detectChanges();
              // }
            });
        
            this.changeDetector.detectChanges();
          }
          else {
            this.snackBar.open(". در حال حاضر سوالی وجود ندارد", "Close", { horizontalPosition: 'center', verticalPosition: 'top', duration: 4000 });
          }
        }
      }
    );
  }

  calcResultCplus(): void {
    var question1 = document.getElementsByName("1") as NodeListOf<HTMLInputElement>;
    for (var i = 0; i < question1.length; i++) {
      if (question1[i].checked == true) {
        if ((parseInt(question1[i].value)) == 3) {
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
        if ((parseInt(question2[i].value)) == 4) {
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
        if ((parseInt(question3[i].value)) == 4) {
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
        if ((parseInt(question4[i].value)) == 3) {
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
        if ((parseInt(question8[i].value)) == 1) {
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
        if ((parseInt(question8[i].value)) == 2) {
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
        if ((parseInt(question8[i].value)) == 2) {
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
      this.hour = parseInt(((this.finalTime) / 3600).toFixed(0));
      this.finalTime -= 3600 * this.hour;
    }
    else {
      this.hour = 0;
    }
    if (this.finalTime >= 60) {
      this.minute = parseInt(((this.finalTime) / 60).toFixed(0));
      this.finalTime -= 60 * this.minute;
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
      testName: "c++",
      myDate: new Date().toString(),
      testHour: this.hour,
      testMinute: this.minute,
      testSecond: this.second,
      numberOfCorrect: this.correctAnswers,
      numberOfWrong: this.wrongAnswers,
      numberOfNoAnswer: this.noAnswers,
      description: this.description
    }

    this.http.post<Result>(this.baseApiUrl + 'result/add-result', result).subscribe(
      {
        next: res => {
          this.resultRes = res;
          console.log(res);
          if (this.resultRes) {
            var start = document.getElementById("start");
            start!.hidden = true;
            var back = document.getElementById("back");
            back!.hidden = true;
            sessionStorage.setItem('result-id', this.resultRes.id!);
            this.router.navigateByUrl('/show-result');
          }
        }
      }
    );
  }
}