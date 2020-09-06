import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Component
import { Topic } from '../../../models/topic';

//Service
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [UserService, TopicService]
})
export class AddComponent implements OnInit {

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
    this.page_title = 'Crear tema';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic('', '', '', '', '', '', this.identity._id, null);
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    //Ajax petition
    this._topicService.addTopic(this.token, this.topic).subscribe(
      response => {
        if (response.topic) {
          //Success message
          this.status = 'success';

          //Update topic
          this.topic = response.topic;

          //Clear form
          form.reset();
        } else {
          this.status = 'error';
        }

      },
      error => {
        //Show error
        console.log(error);

        //Error message
        this.status = 'error';
      }
    )
  }

}
