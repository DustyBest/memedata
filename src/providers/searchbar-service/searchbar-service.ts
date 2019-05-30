import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardServiceProvider } from '../dashboard-service/dashboard-service';
import { Events } from 'ionic-angular';

/*
  Generated class for the SearchbarServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchbarServiceProvider {

  searchTerm:string;
  polls:any = [];
  newPolls:any = [];

  pollsApi:string = 'http://localhost:3000/api/pollSets?access_token=b9mlT8uvLmKJj38eoquDnslnogB07V0mYpd4FDhAhRfT9twx9uf5REChqXEkMK2I';

  constructor(public http: HttpClient, public dash$: DashboardServiceProvider, public events: Events) {
    console.log('Hello SearchbarServiceProvider Provider');
  }

  setFilteredItems(){
    this.http.get(this.pollsApi).subscribe((response) => {
      this.polls = [];
      this.polls = response;
      console.log(this.polls);
      this.polls = this.polls.filter(poll => poll.pollCategory === this.searchTerm);
      console.log(this.polls);
      this.searchTerm = '';
      if(this.polls.length > 0){
        this.events.publish('search success');
        this.dash$.polls = this.polls;
        this.dash$.displayedPolls = [];
        for (let i=0; i <10; i++) {
          this.dash$.displayedPolls.push(this.polls[this.dash$.displayedPolls.length]);
        }        
      } else {
        console.log('No Search Results');
      }
    })
  }
    
//   var sample = [1, 2, 3] // yeah same array
// // es5
// var result = sample.filter(function(elem){
//     return elem !== 2;
// })
// console.log(result)
// // es6
// var result = sample.filter(elem => elem !== 2)
// /* output */
// [1, 3]

}
