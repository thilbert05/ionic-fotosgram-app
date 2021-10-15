import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  posts: Post[] = [];
  enableInfinite = true;

  constructor(private postService: PostsService) {}

  ionViewWillEnter() {
    this.cargarData();
    this.postService.nuevoPost.subscribe((post) => {
      this.posts.unshift(post);
    });
  }

  cargarData(event?, pull: boolean = false) {

    this.postService.getPosts(pull).subscribe((resp) => {
      console.log(resp);
      this.posts.push(...resp.posts);

      if (event) {
        event.target.complete();

        if (resp.posts.length === 0) {
          this.enableInfinite = false;
        }
      }
    });

  }

  recargar(event) {

    this.cargarData(event, true);
    this.enableInfinite = true;
    this.posts = [];
    event.target.complete();

  }





}
