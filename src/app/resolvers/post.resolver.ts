import { ResolveFn } from '@angular/router';
import { PostService } from '../services/post.service';
import { inject, input } from '@angular/core';
import { Post } from '../models/post.model';

export const postResolver: ResolveFn<Post[] | null> = (route, state) => {
  const userId = route.paramMap.get('userId');
  const postService = inject(PostService);
  return postService.getPostList(userId!);
};

// export const userResolver: ResolveFn<User[] | null> = (route, state) => {
//   const userService = inject(UserService);
//   return userService.getUserList();
// };
