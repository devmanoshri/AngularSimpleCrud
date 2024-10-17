import { Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { Post } from '../../../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { PostService } from '../../../services/post.service';
import { MessagesService } from '../../shared/messages/messages.service';
import {
  ModalComponent,
  ModalConfig,
} from '../../shared/modal/modal.component';
import { Subscription } from 'rxjs';
import { MessageType } from '../../shared/messages/messages.utils';
import { AddEditComponent } from './add-edit/add-edit.component';
import { generatePDF } from '../../../util/htmlToPdf';
type Posts = { posts: Post[] };

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [ListingComponent, AddEditComponent, ModalComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  postList: Post[] = [];
  userId!: number;
  selectedPost: Post | null | undefined;
  selectedPostId: number | null | undefined;
  showModal = false;
  showDeleteModal = false;
  subscriptions: Subscription[] = [];
  deleteModalConfig!: ModalConfig;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private messagesService: MessagesService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    const subPost = this.activatedRoute.data.subscribe({
      next: (data) => {
        this.postList = (data as Posts).posts;
      },
    });
    const subUserId = this.activatedRoute.paramMap.subscribe(
      (params) => (this.userId = +params.get('userId')!)
    );

    this.destroyRef.onDestroy(() => {
      subPost.unsubscribe();
      subUserId.unsubscribe();
    });
  }
  onGeneratePDF() {
    generatePDF('postList');
  }
  onAddEditPost(postId: number): void {
    if (postId) {
      this.selectedPost = this.getPostToEdit(postId);
    }
    this.showModal = true;
  }

  onCloseModal(): void {
    this.showModal = false;
    this.selectedPost = null;
  }

  onSavePost(dataToSave: Partial<Post>): void {
    dataToSave = { ...dataToSave, userId: this.userId };
    this.subscriptions.push(
      this.postService.savePost(dataToSave).subscribe({
        next: (savedData: Post) => {
          if (dataToSave.id) {
            this.updatePosts(savedData);
          } else {
            this.postList = [savedData, ...this.postList];
          }
          this.onCloseModal();
          this.messagesService.showMessage({
            message: 'Data saved Successfully!!',
            type: MessageType.Success,
            id: 0,
          });
        },
      })
    );
  }

  onDeletePost(postId: number): void {
    this.selectedPostId = postId;
    this.showDeleteModal = true;
    this.deleteModalConfig = {
      title: 'Delete Post',
    };
  }

  confirmDelete(): void {
    this.showDeleteModal = false;
    if (this.selectedPostId) {
      this.subscriptions.push(
        this.postService.deletePost(this.selectedPostId).subscribe({
          next: () => {
            this.postList = this.postList.filter(
              (post) => post.id !== this.selectedPostId
            );
            this.selectedPostId = null;
            this.messagesService.showMessage({
              message: 'Data deleted Successfully!!',
              type: MessageType.Success,
              id: 0,
            });
          },
          error: () => {
            this.selectedPostId = null;
          },
        })
      );
    }
  }

  private updatePosts(savedData: Post): void {
    this.postList = this.postList.map((post) => {
      if (post.id === savedData.id) {
        return savedData;
      } else {
        return post;
      }
    });
  }

  private getPostToEdit(selectedPostId: number): Post | undefined {
    return this.postList.find((post: Post) => post.id === selectedPostId);
  }
}
