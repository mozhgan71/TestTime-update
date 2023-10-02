import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-create-qustion',
  templateUrl: './create-qustion.component.html',
  styleUrls: ['./create-qustion.component.scss']
})
export class CreateQustionComponent {
  questionRes: Question | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }

  //#region Create Form Group/controler (AbstractControl)
  questionFg = this.fb.group({ // formGroup
    feildNameCtrl: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    descriptionCtrl: ['', [Validators.required, Validators.minLength(10)]],
    option1Ctrl: ['', [Validators.required]],
    option2Ctrl: ['', [Validators.required]],
    option3Ctrl: ['', [Validators.required]],
    option4Ctrl: ['', [Validators.required]],
    correctCtrl: ['', [Validators.required, Validators.maxLength(1), Validators.min(1), Validators.max(4)]]
  });
  //#endregion

  //#region Forms Properties
  get FeildNameCtrl(): FormControl {
    return this.questionFg.get('feildNameCtrl') as FormControl;
  }
  get DscriptionCtrl(): FormControl {
    return this.questionFg.get('descriptionCtrl') as FormControl;
  }
  get Option1Ctrl(): FormControl {
    return this.questionFg.get('option1Ctrl') as FormControl;
  }
  get Option2Ctrl(): FormControl {
    return this.questionFg.get('option2Ctrl') as FormControl;
  }
  get Option3Ctrl(): FormControl {
    return this.questionFg.get('option3Ctrl') as FormControl;
  }
  get Option4Ctrl(): FormControl {
    return this.questionFg.get('option4Ctrl') as FormControl;
  }
  get CorrectCtrl(): FormControl {
    return this.questionFg.get('correctCtrl') as FormControl;
  }
  //#endregion

  //#region Methods
  addQuestion(): void {
    console.log(this.questionFg.value);

    let question: Question = {
      feildName: this.FeildNameCtrl.value,
      descriptionQuestion: this.DscriptionCtrl.value,
      option1: this.Option1Ctrl.value,
      option2: this.Option2Ctrl.value,
      option3: this.Option3Ctrl.value,
      option4: this.Option4Ctrl.value,
      correctAnswer: this.CorrectCtrl.value
    }

    this.http.post<Question>('http://localhost:5000/api/userquestion/add-question', question).subscribe(
      {
        next: res => {
          this.questionRes = res;
          console.log(res);
        }
      }
    );
    alert("ممنون از همکاری شما.\n سوال شما با موفقیت ثبت شد.");
    this.questionFg.reset();
  }
  //#endregion
}