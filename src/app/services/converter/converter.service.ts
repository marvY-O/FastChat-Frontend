import { Injectable } from '@angular/core';
import { Conversation, FirstFetchMessageResponse } from '../../interfaces/chats.interface';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  
  userId: string = ''

  constructor(private profileService: ProfileService) { 
    this.profileService.getUserInfo().subscribe(response => {
      this.userId = response.id;
    })
  }

  transformFirstFetch(data: FirstFetchMessageResponse[]): {[key: string]: Conversation} {
    // Implement your transformation logic here
    // Example: Converting array of objects to a specific format
    let conversation : {[key: string]: Conversation} = {};
    
    data.reverse().forEach(element => {
        let friendId = element.sender_id == this.userId ? element.receiver_id : element.sender_id;
        if (!conversation.hasOwnProperty(friendId)){
          conversation[friendId] = {
            name: "",
            conversation: []
          }
        }
        conversation[friendId].conversation.push({
          time: element.timestamp,
          message: element.content,
          sent: element.sender_id == this.userId
        })
    });

    return conversation;
  }
}
