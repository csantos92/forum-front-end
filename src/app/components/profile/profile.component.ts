import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Models
import { User } from '../../models/user';
import { Topic } from '../../models/topic';

//Services
import { UserService } from '../../services/user.service';
import { TopicService } from '../../services/topic.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService, TopicService]
})
export class ProfileComponent implements OnInit {

  public user: User;
  public topics: Topic[];
  public url: string;
  public page_title: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _topicService: TopicService
  ) { 
    this.url = global.url;
    this.page_title = "Perfil";
  }

  ngOnInit(): void {
    //Get user id from URL
    this._route.params.subscribe(
      params => {
        let userId = params['id'];

        //Pass user id to getUser & getTopics
        this.getUser(userId);
        this.getTopics(userId);
      }
    )
  }

  getUser(userId){
    //Ajax petition
    this._userService.getUser(userId).subscribe(
      response => {
        if(response.user){
          //Save user from API
          this.user = response.user;
        }
      }, error => {
        //Show error
        console.log(error);
      }
    )
  }

  getTopics(userId){
    //Ajax petition
    this._topicService.getTopicsByUser(userId).subscribe(
      response => {
        if(response.topics){
          //Save topics from API
          this.topics = response.topics;
        }
      }, error => {
        //Show error
        console.log(error);
      }
    )
  }


}
