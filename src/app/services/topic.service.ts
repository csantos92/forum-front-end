import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic } from '../models/topic';
import { global } from './global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class TopicService {

    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient) {
        this.url = global.url;
    }

    addTopic(token, topic): Observable<any> {
        //Convert user object into JSON
        let params = JSON.stringify(topic);

        //Define headers
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        //Ajax petition
        return this._http.post(this.url + 'topic', params, { headers: headers });
    }

    getTopicsByUser(userId): Observable<any> {
        //Define headers
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        //Ajax petition
        return this._http.get(this.url + 'user-topics/' + userId, { headers: headers });
    }

    getTopic(id): Observable<any> {
        //Ajax petition
        return this._http.get(this.url + 'topic/' + id);
    }

    update(token, id, topic): Observable<any> {
        //Get params
        let params = JSON.stringify(topic);

        //Define headers
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        //Ajax petition
        return this._http.put(this.url + 'topic/' + id, params, { headers: headers });
    }

    delete(token, id): Observable<any> {
        //Define headers
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        //Ajax petition
        return this._http.delete(this.url + 'topic/' + id, { headers: headers });
    }

    getTopics(page = 1): Observable<any> {
        //Ajax petition
        return this._http.get(this.url + 'topics/' + page);
    }
}