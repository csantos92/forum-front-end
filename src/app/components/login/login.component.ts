import { Component, OnInit } from '@angular/core';

//Necessary imports
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public identity: User;
  public token: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Iniciar sesión';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    //Make ajax petition
    this._userService.signup(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          //Save user
          this.identity = response.user;

          //Save user in local storage
          localStorage.setItem('identity', JSON.stringify(this.identity));

          //Get token
          //Make ajax petition
          this._userService.signup(this.user, true).subscribe(
            response => {
              if (response.token) {
                //Save user's token
                this.token = response.token;

                //Save token in local storage
                localStorage.setItem('token', this.token);
                
                //Redirect
                this._router.navigate(['/home']);

              } else {
                this.status = 'error';
              }
            },
            error => {
              console.log(error);
              //Set status message
              this.status = 'error';
            }
          );

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
    );
  }

}
