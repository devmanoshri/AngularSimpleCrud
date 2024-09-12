import { Component, Input, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss',
  providers: [BsModalService],
})
export class AddEditComponent {
  @Input() userId!: string;
  @Input() exitModal = (): void => {};

  postForm = new FormGroup({
    title: new FormControl('', { validators: [Validators.required] }),
    body: new FormControl('', { validators: [Validators.required] }),
  });

  onSubmit(): void {
    const formData = this.postForm.value;
    console.log(formData);
  }

  resetForm() {
    this.postForm.reset();
  }
}
