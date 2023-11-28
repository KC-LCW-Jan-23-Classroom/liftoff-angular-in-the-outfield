import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.css']
})
export class ThemeSwitchComponent implements OnInit {

  isDarkMode = false;

  constructor() { }

  ngOnInit(): void { }

  onToggle(event: MatSlideToggleChange) {
    this.isDarkMode = event.checked;
  }
}
