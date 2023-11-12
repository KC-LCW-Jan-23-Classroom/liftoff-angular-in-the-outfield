import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  streamingServices = {
    netflix: false,
    hulu: false,
    amazon: false,
    apple: false,
    disney: false,
    peacock: false,
    hbo: false,
    paramount: false,
  };
  genre!: string;
  runtime!: string;
  timePeriod!: string;
  watchProvidersIds: string[] = [];

  getStreamingIds() {
    this.watchProvidersIds = [];
    
    if (this.streamingServices.netflix) {
      this.watchProvidersIds.push('8');
    }

    if (this.streamingServices.hulu) {
      this.watchProvidersIds.push('15');
    }

    if (this.streamingServices.amazon) {
      this.watchProvidersIds.push('9');
    }

    if (this.streamingServices.apple) {
      this.watchProvidersIds.push('2');
    }

    if (this.streamingServices.disney) {
      this.watchProvidersIds.push('337');
    }

    if (this.streamingServices.peacock) {
      this.watchProvidersIds.push('386');
    }

    if (this.streamingServices.hbo) {
      this.watchProvidersIds.push('1899');
    }

    if (this.streamingServices.paramount) {
      this.watchProvidersIds.push('531');
    }
  }

  onSubmit() {
    this.getStreamingIds();
    console.log(this.watchProvidersIds, this.genre, this.runtime, this.timePeriod);
  }
}
