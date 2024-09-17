import { Component, OnInit, TemplateRef, input, output } from '@angular/core';
import { Post } from '../../../../models/post.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { AddEditComponent } from '../add-edit/add-edit.component';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [AddEditComponent],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss',
  providers: [BsModalService],
})
export class ListingComponent {
  postList = input.required<Post[]>();
  userId = input.required<string>();
  addEditPost = output<number>();
  deletePost = output<number>();

  //modalRef?: BsModalRef;

  // constructor(
  //  // private modalService: BsModalService,
  //   private route: ActivatedRoute
  // ) {}

  // openModal(viewUserTemplate: TemplateRef<any>, userId: string) {
  //   if (this.userId()) {
  //     // this.user = this.userData.find((x) => x.id === userId);
  //     // console.log(this.user);
  //     this.modalRef = this.modalService.show(viewUserTemplate);
  //   }
  // }
  // exitModal = (): void => {
  //   this.modalRef?.hide();
  // };
  postId(index: number, post: Post): number {
    return post.id;
  }

  onAddEditPost(postId = 0): void {
    this.addEditPost.emit(postId);
  }

  onDeletePost(postId = 0): void {
    this.deletePost.emit(postId);
  }
}
