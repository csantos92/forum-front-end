import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {

  public title = 'Forum';
  public identity;
  public token;
  public url: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit() {
    console.log(this.identity);
    console.log(this.token);
  }

  ngDoCheck() {
    //Check if the user is identified when something changes
    this.identity = this._userService.getIdentity();
  }


  logout() {
    //Wipe out local storage data
    localStorage.clear();

    //Wipe out identified user data
    this.identity = null;
    this.token = null;

    //Redirect
    this._router.navigate(['/home']);
}
}
