import { Component } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subject, debounceTime, distinctUntilChanged, timeInterval, timeout } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIcon, MatButton, MatProgressSpinnerModule, NgIf],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {
  searchTerm: string = '';
  searchResults: string[] = [];
  private searchSubject: Subject<string> = new Subject<string>();
  loading: boolean = false;

  constructor(){
    this.searchSubject.pipe(
      debounceTime(300), // Adjust the debounce time as needed (in milliseconds)
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      // Call your search function here
      this.performSearch(searchTerm);
    });
  }

  waitOneSecond(): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000); // 1000 milliseconds = 1 second
    });
  }

  onSearch(){
    this.searchSubject.next(this.searchTerm);
  }

  async performSearch(text: string){
    if (!text) {
      this.searchResults = [];
      return;
    };
    this.loading = true;
    console.log("searching for ", text);
    await this.waitOneSecond();
    this.searchResults.push("HEHE");
    this.loading = false;
  }

}
