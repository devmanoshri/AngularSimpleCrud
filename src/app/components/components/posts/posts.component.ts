import { Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { Post } from '../../../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
type Posts = { posts: Post[] };

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [ListingComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  postList: Post[] = [];
  userId!: string;

  constructor(private activatedRoute: ActivatedRoute) {}
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    const subPost = this.activatedRoute.data.subscribe({
      next: (data) => {
        this.postList = (data as Posts).posts;
      },
    });
    const subUserId = this.activatedRoute.paramMap.subscribe(
      (params) => (this.userId = params.get('userId')!)
    );

    this.destroyRef.onDestroy(() => {
      subPost.unsubscribe();
      subUserId.unsubscribe();
    });
  }
}
