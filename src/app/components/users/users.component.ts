import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { global } from '../../services/global';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  public users: User[];
  public url: string;
  public page_title: string;

  constructor(
    private _userService: UserService
  ) { 
    this.url = global.url;
    this.page_title = "Compañeros";
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    //Ajax petition
    this._userService.getUsers().subscribe(
      response => {
        if(response.users){
          //Get users array from API
          this.users = response.users;
        }
      },
      error => {
        //Show error
        console.log(error);
      }
    );
  }

}
