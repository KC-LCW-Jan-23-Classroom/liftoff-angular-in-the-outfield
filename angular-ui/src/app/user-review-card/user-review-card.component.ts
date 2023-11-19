import { Component, Input } from '@angular/core';
import { UserReview } from '../shared/user-review.model';

@Component({
  selector: 'app-user-review-card',
  templateUrl: './user-review-card.component.html',
  styleUrls: ['./user-review-card.component.css'],
})
export class UserReviewCardComponent {
  @Input()
  review!: UserReview;
}
