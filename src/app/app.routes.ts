import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './components/components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/components/dashboard/dashboard.component';
import { userResolver } from './resolvers/user.resolver';
import { PostsComponent } from './components/components/posts/posts.component';
import { postResolver } from './resolvers/post.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },

  {
    path: 'users',
    children: [
      {
        path: ':userId/posts',
        component: PostsComponent,
        resolve: {
          posts: postResolver,
        },
        title: 'Post List',
      },
      {
        path: '',
        resolve: {
          users: userResolver,
        },
        component: DashboardComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Page not found',
  },
];
