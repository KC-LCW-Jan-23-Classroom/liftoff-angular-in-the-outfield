import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent {
  user: any = {
    name: '', // Initialize with the user's data
    email: '' // Initialize with the user's data
  };
  editedUser: any = {}; // Define editedUser to store edited values
  editingProfile: boolean = false;

  constructor(private http: HttpClient) {}

  toggleEdit() {
    this.editingProfile = !this.editingProfile;
    if (this.editingProfile) {
      // Logic when entering edit mode
    }
  }

  saveChanges() {
    // Assuming editedUser contains the updated information
    // Send editedUser to the server to update the user's profile
    this.http.put('http://localhost:8080/api/users', this.editedUser)
      .subscribe(
        (res: any) => {
          this.user = res; // Update user data if the server sends updated data back
          this.toggleEdit(); // Exit edit mode after successful update
        },
        (error: any) => {
          console.error('Error occurred:', error);
        }
      );
  }

  cancelEdit() {
    this.toggleEdit(); // Exit edit mode
  }
}
