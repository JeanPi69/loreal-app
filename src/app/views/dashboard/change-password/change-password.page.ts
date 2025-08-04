import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: false,
})
export class ChangePasswordPage implements OnInit {
  changePasswordForm: FormGroup;
  isSubmitting = false;
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
    this.changePasswordForm = this.formBuilder.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  ngOnInit() {}

  get oldPassword(): AbstractControl {
    return this.changePasswordForm.get('oldPassword')!;
  }

  get newPassword(): AbstractControl {
    return this.changePasswordForm.get('newPassword')!;
  }

  get confirmPassword(): AbstractControl {
    return this.changePasswordForm.get('confirmPassword')!;
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  async onSubmit() {
    if (this.changePasswordForm.invalid) {
      Object.keys(this.changePasswordForm.controls).forEach((key) => {
        const control = this.changePasswordForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom',
    });
    await toast.present();
  }

  modalDismiss() {
    this.modalCtrl.dismiss();
  }
}
