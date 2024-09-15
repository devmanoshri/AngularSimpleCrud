import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

export interface ModalConfig {
  title: string;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() config!: ModalConfig;
  @Output() closeModal = new EventEmitter();
  @ViewChild('closeBtn', { static: false }) closeBtnElement!: ElementRef;

  ngAfterViewInit(): void {
    this.closeBtnElement?.nativeElement.focus();
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }
}
