import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://jsonplaceholder.typicode.com';

  constructor(private httpClient: HttpClient) {}

  getPostList(userId: string): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/users/${userId}/posts`);
  }
}
