import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class UserService {

    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient) {
        this.url = global.url;
    }

    register(user): Observable<any> {
        //Convert user object into JSON
        let params = JSON.stringify(user);

        //Define headers
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        //Ajax petition
        return this._http.post(this.url + 'register', params, { headers: headers });
    }

    signup(user, gettoken = null): Observable<any> {
        //Check token
        if (gettoken != null) {
            user.gettoken = gettoken;
        }

        //Convert user object into JSON
        let params = JSON.stringify(user);

        //Define headers
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        //Ajax petition
        return this._http.post(this.url + 'login', params, { headers: headers });
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity && identity != null && identity != null && identity != undefined && identity != 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {
        let token = localStorage.getItem('token');

        if (token && token != null && token != null && token != undefined && token != 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }

    update(user): Observable<any> {
        //Convert user object into JSON
        let params = JSON.stringify(user);

        //Define headers
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', this.getToken());

        //Ajax petition
        return this._http.put(this.url + 'update', params, { headers: headers });
    }

    getUsers(): Observable<any>{
        //Ajax petition
        return this._http.get(this.url + 'users');
    }

    getUser(userId): Observable<any>{
        //Ajax petition
        return this._http.get(this.url + 'user/' + userId);
    }

}
