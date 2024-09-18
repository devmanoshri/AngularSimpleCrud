import { Component } from '@angular/core';
import { MessagesService } from './messages.service';
import { MessageConfig } from './messages.utils';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  messages!: MessageConfig[];

  constructor(private messagesService: MessagesService) {
    this.messagesService.messages$.subscribe({
      next: (messages: MessageConfig[]) => {
        this.messages = messages;
      },
      error: () => {},
    });
  }

  closeMe(index: number): void {
    this.messagesService.removeMessage(index - 1);
  }
}
