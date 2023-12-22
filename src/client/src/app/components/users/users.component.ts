import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/dataTransferObjects/Auth';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users: User[];
  usersSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['id', 'username', 'firstname', 'lastname', 'age', 'role', 'button'];

  constructor(private usersService : UsersService,
              private router: Router) {
    this.users = new Array<User>();
  }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(
      {
        next: users => {
          this.users = users;
          this.usersSource.data = this.users;
        },
        error: error => {
          console.log(error);
        }
      }
    );
  }

  getUserInfo(id: number) {
    this.router.navigate(["user-editing", id]);
  }

}
