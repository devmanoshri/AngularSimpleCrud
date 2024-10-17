import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Post } from '../../../../models/post.model';
import {
  ModalComponent,
  ModalConfig,
} from '../../../shared/modal/modal.component';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditComponent implements OnInit {
  userId = input<string>();
  //config = input<ModalConfig>();

  selectedPost = input.required<Post | null | undefined>();
  closeModal = output();
  savePost = output<Partial<Post>>();

  isEditMode = false;
  dataToSave!: Partial<Post>;
  modalConfig!: ModalConfig;
  postForm: any;
  //postForm: FormGroup<{ title: FormControl<string | null>; body: FormControl<string | null>; }> ;

  get title(): AbstractControl {
    return this.postForm.get('title');
  }

  get body(): AbstractControl {
    return this.postForm.get('body');
  }

  ngOnInit(): void {
    this.initForm();
    if (this.selectedPost()) {
      this.isEditMode = true;
      this.modalConfig = { title: 'Edit post' };
    } else {
      this.modalConfig = { title: 'Add post' };
    }
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }

  onSubmit(): void {
    // const formData = this.postForm.value;
    // console.log(formData);

    this.postForm.markAllAsTouched();
    if (this.postForm.valid) {
      if (this.isEditMode) {
        this.dataToSave = { ...this.selectedPost(), ...this.postForm.value };
      } else {
        this.dataToSave = { ...this.postForm.value };
      }

      this.savePost.emit(this.dataToSave);
    }
  }
  private initForm(): void {
    this.postForm = new FormGroup({
      title: new FormControl(
        this.selectedPost() ? this.selectedPost()?.title : '',
        { validators: [Validators.required] }
      ),
      body: new FormControl(
        this.selectedPost() ? this.selectedPost()?.body : '',
        { validators: [Validators.required] }
      ),
    });
  }
  resetForm() {
    this.postForm.reset();
  }
}
