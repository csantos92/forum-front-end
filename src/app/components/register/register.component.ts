import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Regístrate';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    //Make ajax petition
    this._userService.register(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          //Set status message
          this.status = 'success';
          
          //Clear form
          form.reset();
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        //Set status message
        this.status = 'error';
      }
    )
  }

}
