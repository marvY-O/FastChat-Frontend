import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Conversation } from '../../../interfaces/chats.interface';
import {MatInputModule} from '@angular/material/input';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, MatIcon, NgFor, NgClass, DatePipe],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent implements OnInit{
 
 @Input() currentChat: Conversation = {
   name: '',
   conversation: []
 };
 @Output() sendMessage = new EventEmitter<string>();

 messageForm: FormGroup;

 constructor(private formBuilder: FormBuilder){
  this.messageForm = this.formBuilder.group({
    message: '',
  })
 }

 ngOnInit(): void {
  }

  send(event: Event){
    if (this.messageForm.controls['message'].value === '') return; 
    event.preventDefault();
    this.sendMessage.emit(this.messageForm.controls['message'].value);
    this.messageForm.reset();

  }
 
}
