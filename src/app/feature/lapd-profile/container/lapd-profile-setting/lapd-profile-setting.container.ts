import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Department, LapdRole } from '../../data-access/lapd-profile.model';
import { LapdProfileService } from '../../data-access/lapd-profile.service';

@Component({
  selector: 'app-lapd-profile-setting',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './lapd-profile-setting.container.html',
  styleUrl: './lapd-profile-setting.container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LapdProfileSettingContainer implements OnInit {
  readonly roles: LapdRole[] = ['staff', 'leader', 'monitor', 'admin'];

  isLoading = false;
  isSaving = false;
  errorMessage = '';
  successMessage = '';
  profileId = 0;
  isCreateMode = false;
  departments: Department[] = [];

  readonly form = this.fb.group({
    userName: [''],
    email: [''],
    password: [''],
    firsName: [''],
    lastName: [''],
    lapd_code: ['', Validators.required],
    department_id: [<number | null>null, Validators.required],
    rank: [''],
    role_type: ['staff' as LapdRole, Validators.required],
    unit_code: [''],
    is_active_duty: [true],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly lapdProfileService: LapdProfileService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
    const rawId = this.route.snapshot.paramMap.get('id');
    this.isCreateMode = rawId === 'new' || !rawId;

    if (this.isCreateMode) {
      this.form.controls.userName.setValidators([Validators.required]);
      this.form.controls.lapd_code.setValidators([Validators.required]);
      this.form.controls.department_id.setValidators([Validators.required]);
        this.form.controls.role_type.setValidators([Validators.required]);
        this.form.updateValueAndValidity();
        this.cdr.markForCheck();
      return;
    }

    this.profileId = Number(rawId);
    this.loadProfile();
  }

  loadDepartments(): void {
    this.lapdProfileService.getDepartments(true).subscribe({
      next: (departments) => {
        this.departments = departments;
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Unable to load departments.';
        this.cdr.markForCheck();
      },
    });
  }

  loadProfile(): void {
    if (!this.profileId) {
      this.errorMessage = 'Invalid profile id.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.lapdProfileService.getProfileById(this.profileId).subscribe({
      next: (profile) => {
        if (!profile) {
          this.errorMessage = 'Profile not found.';
          this.isLoading = false;
          return;
        }

        this.form.patchValue({
          firsName: profile.firsName,
          lastName: profile.lastName,
          lapd_code: profile.lapd_code,
          department_id: profile.department_id ?? null,
          rank: profile.rank,
          role_type: profile.role_type,
          unit_code: profile.unit_code,
          is_active_duty: profile.is_active_duty,
        });
        this.form.markAsPristine();
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Unable to load profile detail.';
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isCreateMode) {
      this.lapdProfileService.createProfile(this.form.getRawValue()).subscribe({
        next: (profile) => {
          this.successMessage = 'Profile created successfully.';
          this.isSaving = false;
          this.form.markAsPristine();
          this.cdr.markForCheck();
          this.router.navigate(['/app/lapd-profile', profile.id]);
        },
        error: () => {
          this.errorMessage = 'Failed to create profile.';
          this.isSaving = false;
          this.cdr.markForCheck();
        },
      });
      return;
    }

    if (!this.profileId) {
      this.errorMessage = 'Invalid profile id.';
      this.isSaving = false;
      return;
    }

    this.lapdProfileService.updateProfile(this.profileId, this.form.getRawValue()).subscribe({
      next: () => {
        this.successMessage = 'Profile updated successfully.';
        this.isSaving = false;
        this.form.markAsPristine();
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Failed to save profile changes.';
        this.isSaving = false;
        this.cdr.markForCheck();
      },
    });
  }

  onBack(): void {
    this.router.navigate(['/app/lapd-profile']);
  }
}
