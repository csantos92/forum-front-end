import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Models
import { Topic } from '../../models/topic';
import { Comment } from '../../models/comment';

//Services
import { TopicService } from '../../services/topic.service';
import { UserService } from '../../services/user.service';
import { CommentService } from '../../services/comment.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss'],
  providers: [TopicService, UserService, CommentService]
})
export class TopicDetailComponent implements OnInit {

  public topic: Topic;
  public comment: Comment;
  public identity;
  public token;
  public status: string;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService,
    private _userService: UserService,
    private _commentService: CommentService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.comment = new Comment('', '', '', this.identity._id);
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getTopic();
  }

  getTopic() {
    //Get topic id form URL
    this._route.params.subscribe(params => {
      let id = params['id'];

      //Ajax petition
      this._topicService.getTopic(id).subscribe(
        response => {
          if (response.topic) {
            //Save response into topic object
            this.topic = response.topic;
          } else {
            //Redirect
            this._router.navigate(['/home']);
          }
        },
        error => {
          //Show error message
          console.log(error);
        }
      );
    });
  }

  onSubmit(form){
    //Ajax petition
    this._commentService.add(this.token, this.comment, this.topic._id).subscribe(
      response => {
        if(response.topic){
          //Success message
          this.status = 'success';

          //Save response into topic object
          this.topic = response.topic;

          //Clear form
          form.reset();
        }else{
          //Error message
          this.status = 'error';
        }
      },
      error => {
        //Error message
        this.status = 'error';
        console.log(error);
      }
    )
  }

  deleteComment(id){
    //Ajax petition
    this._commentService.delete(this.token, this.topic._id, id).subscribe(
      response => {
        if(response.topic){
          //Save response into topic object
          this.topic = response.topic;
        }
      },
      error => {
        //Error message
        console.log(error);
      }
    )
  }
}
