import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Conversation } from '../../chats.interface';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, MatIcon],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent {
 @Input() currentChat: Conversation = {
   name: '',
   conversation: []
 };
 
}
