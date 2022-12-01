import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css'],
  providers: [AuthService]
})
export class SendEmailComponent {

  public user$: Observable<any> = this.authService.afAuth.user;

  constructor(
    private authService: AuthService,
  ) { }

  onReSend() {
    this.authService.verificationEmail();
  }

}
