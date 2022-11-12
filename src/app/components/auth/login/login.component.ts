import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { NavdarComponent } from '../../navdar/navdar.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  titulo = 'Iniciar Sesión';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    public authService: AuthService,
    public navdarComponent: NavdarComponent,
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      pass: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  async onLogin() {
    const { email, pass } = this.loginForm.value;
    try {
      const user = await this.authService.login(email, pass);
      
    } catch (error) {
      console.log(error);
    }
  }

  get getForm(): any {
    return this.loginForm.controls;
  }

}
