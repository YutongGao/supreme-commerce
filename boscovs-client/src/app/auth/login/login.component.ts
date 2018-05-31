import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService as SAuthService} from 'angularx-social-login';

import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  err = false;

  constructor(
    private as: AuthService,
    private fb: FormBuilder,
    private router: Router,
    // private sas: SAuthService,
    // private http: HttpClient,
  ) { }

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      username: '',
      password: ''
    });
  }

  onSubmit() {

    console.log(this.loginFormGroup.value);
    if (this.loginFormGroup.valid) {
      console.log(this.loginFormGroup.value);
      this.as.login(this.loginFormGroup.value)
        .subscribe(res => {
          console.log(res);
          if (res.success) {
            this.router.navigate(['/watches']);
          } else {
            this.err = true;
          }
        });
    } else {
      return false;
    }
  }


  // onRegister() {
  //   this.router.navigate(['/register']);
  // }
  //


}
