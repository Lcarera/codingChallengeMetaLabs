import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MessageService {
  private subject = new Subject<any>();

  sendMessage(message: string, type:string) {
    this.subject.next({ text: message, type: type });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}