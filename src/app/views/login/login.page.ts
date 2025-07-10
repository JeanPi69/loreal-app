import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) { 
    this.loginForm = this.fb.group({
      email: ['giancarlo.paoli@billex.pe', [Validators.required, Validators.email]],
      password: ['password',Validators.required]
    });
  }

  ngOnInit() {
  }

  login(){
    this.loginForm.markAllAsTouched();
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: res=>{
        console.log('Login successful', res);
      },
      error: err=>{
        console.error('Login failed', err);
      }
    }); 
  }

}
