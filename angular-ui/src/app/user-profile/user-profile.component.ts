import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user: any = {}; // Initialize the user object with the current user's data
  editingProfile: boolean = false; // Add the editingProfile variable

  // Constructor and other component methods

  editProfile() {
    this.editingProfile = !this.editingProfile; // Toggle edit mode
  }

  saveChanges() {
    // Implement the saveChanges function to update the user's profile
    // This function remains the same as in the previous response
  }
}
