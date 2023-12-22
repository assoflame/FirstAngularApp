import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {

  signInForm!: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.signInForm = this.fromBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  onSubmit() {
    if (this.signInForm.invalid)
      return;

    const signInDto = {
      username: this.signInForm.controls['username'].value,
      password: this.signInForm.controls['password'].value
    };

    this.authService.signIn(signInDto)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = '/users';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          console.log(error);
        }
      });
  }
}
