import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { AccountService } from '../../../services/account.service';
import { MemberService } from '../../../services/member.service';
import { Member } from '../../../models/member-model';
import { take } from 'rxjs';
import { LoggedInUser } from '../../../models/logged-in-user.model';

@Component({
  selector: 'app-user-photo-edit',
  standalone: true,
  imports: [CommonModule,
    PhotoEditorComponent],
  templateUrl: './user-photo-edit.component.html',
  styleUrl: './user-photo-edit.component.scss'
})
export class UserPhotoEditComponent {
  private accountService = inject(AccountService);
  private memberService = inject(MemberService);
  private platfromId = inject(PLATFORM_ID);

  // private loggedInUser = this.accountService.loggedInUserSig();
  member: Member | undefined;

  ngOnInit(): void {
    this.getMember();
  }

  getMember(): void {
    if (isPlatformBrowser(this.platfromId)) {
      const loggedInUserStr: string | null = localStorage.getItem('loggedInUser');

      if (loggedInUserStr) {
        const loggedInUser: LoggedInUser = JSON.parse(loggedInUserStr);

        this.memberService.getMemberByEmail(loggedInUser.email)?.pipe(take(1)).subscribe(member => {
          if (member) {
            this.member = member;

            // this.initContollersValues(member);
          }
        });

      }
    }

    //   this.accountService.getLoggedInUser().pipe(take(1)).subscribe(loggedInUser => {
    //     if (loggedInUser)
    //       this.memberService.getMemberByEmail(loggedInUser.email)?.pipe(take(1)).subscribe(member => {
    //         if (member) {
    //           this.member = member;

    //           // this.initContollersValues(member);
    //         }
    //       });
    //   });
    // }
  }
}