import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css'],
})
export class ScrollToTopComponent {
  scrollingStarted: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.scrollingStarted = window.scrollY <= 0 ? false : true;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolls to the top smoothly
  }
}
