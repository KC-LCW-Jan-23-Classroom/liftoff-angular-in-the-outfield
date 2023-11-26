import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditUserProfileService } from '../../../shared/edituserprofile.service';
import { AuthService } from 'src/app/user/auth.service';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css'],
})
export class EditUserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user!: User;

  editingProfile = false;

  constructor(
    private formBuilder: FormBuilder,
    private editUserProfileService: EditUserProfileService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.user = this.authService.getUser();

    // this.loadUserProfile();
  }

  // loadUserProfile() {
  //   this.editUserProfileService.getUserProfile(this.user.id).subscribe(
  //     (userData: User) => {
  //       this.user = userData;
  //       this.populateForm();
  //     },
  //     (error: any) => {
  //       console.error('Error fetching user profile:', error);
  //     }
  //   );
  // }

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
    if (this.profileForm.valid) {
      const userId = this.user.id; // Replace this with the actual user ID
      const updatedProfile = { ...this.profileForm.value };
      this.editUserProfileService
        .updateUserProfile(userId, updatedProfile)
        .subscribe(
          (res: User) => {
            this.user = res; // Assign the response to the user variable
            console.log('Success!');
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
