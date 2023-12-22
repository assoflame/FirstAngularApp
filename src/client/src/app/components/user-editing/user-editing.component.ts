
import {Component} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserUpdateDto } from 'src/app/dataTransferObjects/UserUpdateDto';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-editing',
  templateUrl: './user-editing.component.html',
  styleUrls: ['./user-editing.component.css'],

})
export class UserEditingComponent {

  firstFormGroup !: FormGroup
  userId !: number

  constructor(private formBuilder : FormBuilder, private serverService : UsersService, private route: ActivatedRoute, private router : Router) {

  }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      id : new FormControl(),
      username : new FormControl(),
      firstname : new FormControl(),
      lastname : new FormControl(),
      role : new FormControl(),
      age: new FormControl()
    })

    this.route.params.subscribe(params => {
      this.userId = (params['userId']);

      this.serverService.getUser(this.userId).subscribe({
      next : (response) => {
        this.firstFormGroup = this.formBuilder.group({
          id : [response.id],
          username : [response.username],
          firstname : [response.firstname],
          lastname: [response.lastname],
          age: [response.age],
          role : [response.role]
        })
        
      },
      error : error => {
        console.log(error)
        console.log('User info error')
      }
    });
    });
  }

  onRollback() {
    this.router.navigate(["/users"])
  }

  onSubmit() {
    const userUpdateDto : UserUpdateDto = {
      username : this.f["username"].value,
      firstname : this.f["firstname"].value,
      lastname : this.f["lastname"].value,
      age : this.f["age"].value
    }
    this.serverService.updateUser(this.f["id"].value, userUpdateDto)
    .subscribe({
      next : () => {
        const returnUrl ='/users'
        this.router.navigateByUrl(returnUrl)
      },
      error : error => {
        console.log(error)
      }
    })
  }

  get f(){
    return this.firstFormGroup.controls;
  }
}
