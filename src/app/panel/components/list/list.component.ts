import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Component
import { Topic } from '../../../models/topic';

//Service
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [UserService, TopicService]
})
export class ListComponent implements OnInit {

  public page_title: string;
  public topics: Array<Topic>;
  public identity;
  public token: string;;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = 'Mis temas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getTopics();
  }

  getTopics(){
    //Get user ID
    var userId = this.identity._id;

    //Ajax petition
    this._topicService.getTopicsByUser(userId).subscribe(
      response => {
        if(response.topics){
          this.topics = response.topics;
        }
      }, error => {
        console.log(error);
      }
    )
  }

  deleteTopic(id) {
    //Ajax petition
    this._topicService.delete(this.token, id).subscribe(
      response => {
        this.getTopics();
      },
      error => {
        console.log(error);
      }
    )
  }
}
