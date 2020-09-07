import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class UserGuard implements CanActivate{

    constructor(
        private _router: Router,
        private _userService: UserService
    ){

    }

    //Checks if user is identified, if not redirects the user to home page
    canActivate(){
        let identity = this._userService.getIdentity();

        if(identity && identity.name){
            return true;
        }else{
            this._router.navigate(['/']);
            return false;
        }
    }
}