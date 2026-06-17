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
import { LapdGroup } from '../../data-access/lapd-profile.model';
import { LapdProfileService } from '../../data-access/lapd-profile.service';

@Component({
  selector: 'app-squad-group-setting',
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
  templateUrl: './squad-group-setting.container.html',
  styleUrl: './squad-group-setting.container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquadGroupSettingContainer implements OnInit {
  groups: LapdGroup[] = [];
  isLoading = false;
  isSaving = false;
  errorMessage = '';
  successMessage = '';

  readonly createForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
  });

  readonly editForm = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    description: [''],
    is_active: [true],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly lapdProfileService: LapdProfileService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.lapdProfileService.getGroups(true).subscribe({
      next: (groups) => {
        this.groups = groups;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Unable to load squad groups.';
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

    this.lapdProfileService.createGroup({
      name: (this.createForm.value.name || '').trim(),
      description: (this.createForm.value.description || '').trim() || undefined,
    }).subscribe({
      next: () => {
        this.successMessage = 'Squad group created successfully.';
        this.createForm.reset({ name: '', description: '' });
        this.isSaving = false;
        this.loadGroups();
      },
      error: () => {
        this.errorMessage = 'Unable to create squad group.';
        this.isSaving = false;
        this.cdr.markForCheck();
      },
    });
  }

  selectGroup(group: LapdGroup): void {
    this.editForm.patchValue({
      id: group.id,
      name: group.name,
      description: group.description || '',
      is_active: group.is_active,
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

    this.lapdProfileService.updateGroup(id, {
      name: (this.editForm.value.name || '').trim(),
      description: (this.editForm.value.description || '').trim(),
      is_active: this.editForm.value.is_active ?? true,
    }).subscribe({
      next: () => {
        this.successMessage = 'Squad group updated successfully.';
        this.isSaving = false;
        this.loadGroups();
      },
      error: () => {
        this.errorMessage = 'Unable to update squad group.';
        this.isSaving = false;
        this.cdr.markForCheck();
      },
    });
  }

  onDelete(group: LapdGroup, event?: Event): void {
    event?.stopPropagation();

    const shouldDelete = window.confirm(`Delete "${group.name}" squad group?`);
    if (!shouldDelete) {
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.lapdProfileService.deleteGroup(group.id).subscribe({
      next: () => {
        this.successMessage = 'Squad group deleted successfully.';
        if (this.editForm.value.id === group.id) {
          this.editForm.reset({ id: 0, name: '', description: '', is_active: true });
        }
        this.isSaving = false;
        this.loadGroups();
      },
      error: () => {
        this.errorMessage = 'Unable to delete squad group.';
        this.isSaving = false;
        this.cdr.markForCheck();
      },
    });
  }

  onBack(): void {
    this.router.navigate(['/app/lapd-profile']);
  }

  trackByGroup(_: number, group: LapdGroup): number {
    return group.id;
  }
}
