import { Component, OnInit, DoCheck } from '@angular/core';

//Import service
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService]
})
export class HomeComponent implements OnInit, DoCheck {

  public page_title: string;
  public user;

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Bienvenido al foro de programación'
  }

  ngOnInit(): void {
    this.getUser();
  }

  ngDoCheck(){
    this.getUser();
  }

  getUser(){
    this.user = this._userService.getIdentity();
  }

}
