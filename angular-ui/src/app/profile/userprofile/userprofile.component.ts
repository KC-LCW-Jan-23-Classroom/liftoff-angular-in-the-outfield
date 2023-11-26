import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent {
  @Input() user: User | undefined;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute

  ) {}

  getUsername(): string {
    return this.user?.username || '';
  }
}
