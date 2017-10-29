import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private url: string = 'http://localhost:3000';
  private socket;
  public publicPosts: Array<any> = [];
  constructor() {
  }

  ngOnInit() {
    this.socket = io(this.url);
    this.socket.on('dashboardFees', this.postOnDashboard.bind(this));
  }

  private postOnDashboard(posts: Array<any>) {

    //update if necesary
    this.publicPosts.map((obj, i) => {
      for (var index = 0; index < posts.length; index++) {
        if (posts[index].id === obj.id) {
          this.publicPosts[i] = posts[index];
          posts.splice(index, 1);
        }
      }
    });

    this.publicPosts = this.publicPosts.concat(posts);
  }

}

