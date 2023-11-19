import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class UserProfileComponent {
  user = { name: 'John Doe', email: 'john@example.com' };
  editedUser = { ...this.user }; // Create a copy of the user for editing
  editingProfile = false;

  toggleEdit() {
    this.editingProfile = true;
  }

  saveChanges() {
    // Perform actions to save changes to the user object
    this.user = { ...this.editedUser }; // Update the original user object with changes
    this.editingProfile = false; // Exit editing mode
  }

  cancelEdit() {
    // Cancel the editing process and revert changes
    this.editedUser = { ...this.user }; // Revert changes by restoring the editedUser
    this.editingProfile = false; // Exit editing mode
  }
}
