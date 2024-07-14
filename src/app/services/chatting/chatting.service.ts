import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ConverterService } from '../converter/converter.service';
import { Observable, map } from 'rxjs';
import { Conversation, FirstFetchMessageResponse } from '../../interfaces/chats.interface';

@Injectable({
  providedIn: 'root'
})
export class ChattingService {

  private readonly chatServiceUrl = 'http://127.0.0.1:3001'
  private authToken;

  constructor(private http: HttpClient, private authService: AuthService, private converterService: ConverterService) {
    this.authToken = this.authService.getToken();
  }

  firstFetch(): Observable<{[key: string]: Conversation}>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });
    return this.http.get<FirstFetchMessageResponse[]>(this.chatServiceUrl + '/api/chats/fetch/messages', {headers}).pipe(
      map(data => this.converterService.transformFirstFetch(data))
    )
  }
}
