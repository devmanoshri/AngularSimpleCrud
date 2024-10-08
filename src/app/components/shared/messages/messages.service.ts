import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageConfig } from './messages.utils';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages$ = new Subject<MessageConfig[]>();
  private messages: MessageConfig[] = [];

  showMessage(message: MessageConfig): void {
    this.messages.push({ ...message, id: this.messages.length + 1 });
    this.messages$.next(this.messages);
  }

  removeMessage(index: number): void {
    this.messages.splice(index, 1);
    this.messages$.next(this.messages);
  }
}
