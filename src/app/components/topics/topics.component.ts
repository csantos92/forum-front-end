import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Models
import { Topic } from '../../models/topic';

//Service
import { TopicService } from '../../services/topic.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
  providers: [TopicService]
})
export class TopicsComponent implements OnInit {

  public page_title: string;
  public topics: Topic[];
  public totalPages;
  public page;
  public next_page;
  public prev_page;
  public number_pages;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) {
    this.page_title = 'Lista de temas';
    this.url = global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var page = +params['page'];

      if(!page ||page == null || page == undefined){
        page = 1;
        this.prev_page = 1;
        this.next_page = 2;
      }
      
      this.getTopics(page);
    })
  }

  getTopics(page = 1) {
    //Ajax petition
    this._topicService.getTopics(page).subscribe(
      response => {
        if (response.topics) {
          //Save topics from API to object
          this.topics = response.topics;

          //Pagination
          this.totalPages = response.totalPages;

          var number_pages = [];
          for (var i = 1; i <= this.totalPages; i++) {
            number_pages.push(i);
          }

          this.number_pages = number_pages;
          console.log(this.number_pages);

          if (page >= 2) {
            this.prev_page = page - 1;
          } else {
            this.prev_page = 1;
          }

          if (page < this.totalPages) {
            this.next_page = page + 1;
          } else {
            this.next_page = this.totalPages;
          }

        } else {
          //Redirect
          this._router.navigate(['/home']);

        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
