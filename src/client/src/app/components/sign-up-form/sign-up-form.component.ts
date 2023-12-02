import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  signUpForm!: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.signUpForm = this.fromBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  onSubmit() {
    if (this.signUpForm.invalid)
      return;

    const signUpDto = {
      username: this.signUpForm.controls['username'].value,
      password: this.signUpForm.controls['password'].value
    };

    this.authService.signUp(signUpDto)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          console.log(error);
        }
      });
  }
}
