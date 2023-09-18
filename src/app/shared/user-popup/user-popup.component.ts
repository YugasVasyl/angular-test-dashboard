import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../types/type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule],
})
export class UserPopupComponent {
  public form: FormGroup;
  public formControls: any;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: User,
  ) {
    const user = this.data;

    this.form = this.fb.group({
      name: [user?.name, [Validators.required]],
      username: [user?.username, [Validators.required]],
      email: [user?.email, [Validators.required, Validators.email]],
      street: [user?.address?.street, [Validators.required]],
      city: [user?.address?.city, [Validators.required]],
    });
    this.formControls = this.form.controls;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public submit(): void {
    if (this.form.valid) {
      const value = this.form.value;
      if (this.data) {
        this.dialogRef.close({
          ...this.data,
          name: value.name,
          username: value.username,
          email: value.email,
          address: {
            ...this.data.address,
            street: value.street,
            city: value.city,
          }
        });
      } else {
        this.dialogRef.close({
          id: Math.random(),
          name: value.name,
          username: value.username,
          email: value.email,
          address: {
            street: value.street,
            city: value.city,
          }
        });
      }

    } else {
      this.form.markAsTouched();
    }
  }
}
