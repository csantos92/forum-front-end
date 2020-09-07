import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Models
import { Topic } from '../../models/topic';

//Service
import { TopicService } from '../../services/topic.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [TopicService]
})
export class SearchComponent implements OnInit {

  public page_title: string;
  public topics: Topic[];
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) {
    this.url = global.url;

  }

  ngOnInit(): void {
    //Get string form URL
    this._route.params.subscribe(params => {
      var search = params['search'];
      
      //Set title using search string form URL
      this.page_title = 'Buscar: ';
      this.page_title = this.page_title + ' ' + search;

      //Search
      this.getTopics(search);
    })
  }

  getTopics(search){
    //Ajax petition
    this._topicService.search(search).subscribe(
      response => {
        if(response.topics){
          //Save response into topics
          this.topics = response.topics;
        }
      },
      error => {
        //Show error
        console.log(error);
      }
    );
  }

}
