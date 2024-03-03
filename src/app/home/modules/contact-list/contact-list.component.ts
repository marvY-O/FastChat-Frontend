import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { Chat } from '../../chats.interface';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [MatListModule, NgFor, NgClass, NgIf],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  @Input() chats: Chat[] = [];
  @Output() currentContact = new EventEmitter<string>();
  selectedContact: string = '';

  selectContact(userId: string){
    if (this.selectedContact === userId){
      this.selectedContact = '';
    }
    else this.selectedContact = userId;

    this.currentContact.emit(this.selectedContact);
  }
}
