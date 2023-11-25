import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditUserProfileService } from '../../shared/edituserprofile.service';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user: User = {
    id: 0,
    username: '',
    password: '',
    firstName: undefined,
    email: undefined
  };
  editingProfile = false;

  constructor(
    private formBuilder: FormBuilder,
    private editUserProfileService: EditUserProfileService
  ) {}

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.loadUserProfile();
  }

  loadUserProfile() {
    this.editUserProfileService.getUserProfile(this.user.id.toString()).subscribe(
      (userData: User) => {
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
        firstName: this.user.firstName,
        email: this.user.email,
        // Update other form controls as needed
      });
    }
  }

  saveChanges() {
    if (this.profileForm.valid) {
      const userId = '123'; // Replace this with the actual user ID
      const updatedProfile = { ...this.profileForm.value };
      this.editUserProfileService.updateUserProfile(userId, updatedProfile).subscribe(
        (res: User) => {
          this.user = res; // Assign the response to the user variable
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
