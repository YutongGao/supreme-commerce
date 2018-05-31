import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup;

  constructor(
    private as: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerFormGroup = this.fb.group({
      username: '',
      // email: '',
      password: ''
    });
  }

  onSubmit() {
    if (this.registerFormGroup.valid){
      this.as.register(this.registerFormGroup.value)
        .subscribe(res => {
          if(res.success) {
            this.router.navigate(['/login']);
          } else {
            // show error text.
          }
        });
    } else {
      return false;
    }
  }

}
