import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/models/Register';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  updateForm: FormGroup;
  countries: Country[] = [];

  documentTypes = [
    { value: 'dni', label: 'DNI' },
    { value: 'passport', label: 'Pasaporte' },
  ];

  dietaryPreferences = [
    { value: 'kosher', label: 'Kosher' },
    { value: 'vegetarian', label: 'Vegetariano' },
    { value: 'vegan', label: 'Vegano' },
    { value: 'pescetariano', label: 'Pescetariano' },
    { value: 'sin preferencias', label: 'Sin Preferencias' },
    { value: 'otros', label: 'Otros' },
  ];

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService
  ) {
    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      document_type: ['', [Validators.required]],
      document_number: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      accepts_publicity: [false],
    });
  }

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.registerService.getCountries().subscribe((res) => {
      this.countries = res.data;
    });
  }

  onSubmit() {
    this.updateForm.markAllAsTouched();
    if (this.updateForm.valid) {
      console.log('Form data:', this.updateForm.value);
    } else {
      console.log('Form data:', this.updateForm.value);
    }
  }
}
