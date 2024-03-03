import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { ChatWindowComponent } from './modules/chat-window/chat-window.component';
import { ContactListComponent } from './modules/contact-list/contact-list.component';
import { Chat, Conversation } from './chats.interface';
import { ConvertToNumber } from 'web3';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, NgIf, RouterLink, ToolbarComponent, ChatWindowComponent, ContactListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  Conversations: {[key: string]: Conversation} = {
    "1": {
      "name": "Vyom",
      "conversation": [
        {
          "time": "2024-03-03T08:00:00Z",
          "message": "Hi",
          "sent": false
        },
        {
          "time": "2024-03-02T10:30:00Z",
          "message": "How are you?",
          "sent": true
        },
        {
          "time": "2024-03-01T15:45:00Z",
          "message": "Nice to meet you",
          "sent": false
        }
      ]
    },
    "2": {
      "name": "Ishleen",
      "conversation": [
        {
          "time": "2024-03-03T09:15:00Z",
          "message": "Hello",
          "sent": true
        },
        {
          "time": "2024-03-02T11:20:00Z",
          "message": "What are you doing?",
          "sent": false
        }
      ]
    },
    "3": {
      "name": "Sidharth",
      "conversation": [
        {
          "time": "2024-03-03T10:00:00Z",
          "message": "Goodbye",
          "sent": true
        }
      ]
    },
    "4": {
      "name": "Shailesh",
      "conversation": [
        {
          "time": "2024-03-03T11:30:00Z",
          "message": "See you later",
          "sent": false
        }
      ]
    }
  }
  Chats: Chat[] = [];
  selectedContact: string = '1';
  emptyConversation = {
    name: '',
    conversation: []
  }

  ngOnInit(): void {
    this.buildContacts();
  }

  changeSelectedContact(variable: string){
    this.selectedContact = variable;
  }

  buildContacts(){
    this.Chats = [];
    for (const id in this.Conversations){
      if (this.Conversations.hasOwnProperty(id)){
        const name = this.Conversations[id].name;
        const conversation = this.Conversations[id].conversation
        const contact: Chat = {
          id: id,
          name: name,
          last_message: conversation[conversation.length-1]
        }
        this.Chats.push(contact);
      }
    }
  }
}
