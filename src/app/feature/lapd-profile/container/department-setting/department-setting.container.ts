import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Department } from '../../data-access/lapd-profile.model';
import { LapdProfileService } from '../../data-access/lapd-profile.service';

@Component({
  selector: 'app-department-setting',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
  ],
  templateUrl: './department-setting.container.html',
  styleUrl: './department-setting.container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentSettingContainer implements OnInit {
  departments: Department[] = [];
  isLoading = false;
  isSaving = false;
  errorMessage = '';
  successMessage = '';

  readonly createForm = this.fb.group({
    name: ['', Validators.required],
  });

  readonly editForm = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    is_active: [true],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly lapdProfileService: LapdProfileService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.lapdProfileService.getDepartments(true).subscribe({
      next: (departments) => {
        this.departments = departments;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Unable to load departments.';
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  onCreate(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.lapdProfileService.createDepartment({
      name: (this.createForm.value.name || '').trim(),
    }).subscribe({
      next: () => {
        this.successMessage = 'Department created successfully.';
        this.createForm.reset({ name: '' });
        this.isSaving = false;
        this.loadDepartments();
      },
      error: () => {
        this.errorMessage = 'Unable to create department.';
        this.isSaving = false;
        this.cdr.markForCheck();
      },
    });
  }

  selectDepartment(department: Department): void {
    this.editForm.patchValue({
      id: department.id,
      name: department.name,
      is_active: department.is_active,
    });
  }

  onUpdate(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const id = this.editForm.value.id || 0;
    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.lapdProfileService.updateDepartment(id, {
      name: (this.editForm.value.name || '').trim(),
      is_active: this.editForm.value.is_active ?? true,
    }).subscribe({
      next: () => {
        this.successMessage = 'Department updated successfully.';
        this.isSaving = false;
        this.loadDepartments();
      },
      error: () => {
        this.errorMessage = 'Unable to update department.';
        this.isSaving = false;
        this.cdr.markForCheck();
      },
    });
  }

  onDelete(department: Department, event?: Event): void {
    event?.stopPropagation();

    const shouldDelete = window.confirm(`Delete "${department.name}" department?`);
    if (!shouldDelete) {
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.lapdProfileService.deleteDepartment(department.id).subscribe({
      next: () => {
        this.successMessage = 'Department deleted successfully.';
        if (this.editForm.value.id === department.id) {
          this.editForm.reset({ id: 0, name: '', is_active: true });
        }
        this.isSaving = false;
        this.loadDepartments();
      },
      error: () => {
        this.errorMessage = 'Unable to delete department.';
        this.isSaving = false;
        this.cdr.markForCheck();
      },
    });
  }

  onBack(): void {
    this.router.navigate(['/app/lapd-profile']);
  }
}
