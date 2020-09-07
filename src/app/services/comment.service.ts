import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic } from '../models/topic';
import { global } from './global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class CommentService {

    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient) {
        this.url = global.url;
    }

    add(token, comment, topicId): Observable<any> {
        //Convert user object into JSON
        let params = JSON.stringify(comment);

        //Define headers
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        //Ajax petition
        return this._http.post(this.url + 'comment/topic/' + topicId, params, { headers: headers });
    }

    delete(token, topicId, commentId): Observable<any> {
        //Define headers
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        //Ajax petition
        return this._http.delete(this.url + 'comment/' + topicId + '/' + commentId, { headers: headers });
    }
}