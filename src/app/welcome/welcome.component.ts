import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  svgContent: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    this.svgContent = this.sanitizer.bypassSecurityTrustHtml('<img src="assets/logo/mainlogo.svg">');
  }
}
