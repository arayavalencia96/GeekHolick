import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [AuthService],
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  userEmail = new FormControl('');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  async onReset() {
    try {
      const email = this.resetForm.get('email')?.value;
      console.log(email);
      await this.authService.resetPass(email);
      console.log('se envió el resetPass');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }

  get getForm(): any {
    return this.resetForm.controls;
  }
}
