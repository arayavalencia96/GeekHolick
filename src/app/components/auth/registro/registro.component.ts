import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [AuthService],
})
export class RegistroComponent implements OnInit {
  RegisterForm: FormGroup;
  submitted = false;
  loading = false;
  titulo = 'Registrarse';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.RegisterForm = this.fb.group({
      email: ['', Validators.required],
      pass: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  async onRegister() {
    const { email, pass } = this.RegisterForm.value;
    try {
      const user = await this.authService.register(email, pass);
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }

  get getForm(): any {
    return this.RegisterForm.controls;
  }

}
