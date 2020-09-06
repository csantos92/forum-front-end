import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Component
import { Topic } from '../../../models/topic';

//Service
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../add/add.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [UserService, TopicService]
})
export class EditComponent implements OnInit {

  public page_title: string;
  public topic: Topic;
  public identity;
  public token: string;;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = 'Editar tema';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic('', '', '', '', '', '', this.identity._id, null);
  }

  ngOnInit(): void {
    this.getTopic();
  }

  getTopic() {
    //Get URL params
    this._route.params.subscribe(params => {
      let id = params['id'];

      //Get topic
      this._topicService.getTopic(id).subscribe(
        response => {
          if (!response.topic) {
            this._router.navigate(['/panel']);
          } else {
            this.topic = response.topic;
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  onSubmit(form) {
    //Get topic ID
    var id = this.topic._id;

    //Ajax petition
    this._topicService.update(this.token, id, this.topic).subscribe(
      response => {
        if (response.topic) {
          this.status = 'success';
          this.topic = response.topic;
        } else {
          this.status = 'error;'
        }
      },
      error => {
        this.status = 'error;'
      }
    )
  }
}
