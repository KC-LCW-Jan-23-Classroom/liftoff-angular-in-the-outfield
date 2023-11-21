import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditUserProfileService } from '../../shared/edituserprofile.service';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user: any = {};
  editingProfile = false;

  constructor(private formBuilder: FormBuilder, private editUserProfileService: EditUserProfileService) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Add more form controls as needed
    });

    this.loadUserProfile();
  }

  loadUserProfile() {
    this.editUserProfileService.getUserProfile().subscribe(
      (userData: any) => {
        this.user = userData;
        this.populateForm();
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  populateForm() {
    if (this.profileForm) {
      this.profileForm.patchValue({
        firstName: this.user.name,
        email: this.user.email,
        // Update other form controls as needed
      });
    }
  }

  saveChanges() {
    if (this.profileForm) {
      const updatedProfile = { ...this.profileForm.value };
      this.editUserProfileService.updateUserProfile(updatedProfile).subscribe(
        (res: any) => {
          this.user = res; // Update user data if the server sends updated data back
          // Optionally, perform any additional actions upon successful update
        },
        (error: any) => {
          console.error('Error updating user profile:', error);
        }
      );
    }
  }

  cancelEdit() {
    this.editingProfile = false;
    this.populateForm(); // Reload user data when cancelling edit mode
  }

  toggleEdit() {
    this.editingProfile = !this.editingProfile;
    if (this.editingProfile) {
      this.populateForm(); // Load user data when entering edit mode
    }
  }
}
