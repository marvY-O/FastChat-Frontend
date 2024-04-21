import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { Chat } from '../../chats.interface';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddContactComponent } from './add-contact/add-contact.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [MatListModule, NgFor, NgClass, NgIf, MatIcon, MatButtonModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  @Input() chats: Chat[] = [];
  @Output() currentContact = new EventEmitter<string>();
  selectedContact: string = '';

  constructor(private dialog: MatDialog){}

  selectContact(userId: string){
    if (this.selectedContact === userId){
      this.selectedContact = '';
    }
    else this.selectedContact = userId;

    this.currentContact.emit(this.selectedContact);
  }
  openAddContactDialog(){
    const dialogRef = this.dialog.open(AddContactComponent, {
      height: '400px',
      width: '310px',
    });
  }
}
