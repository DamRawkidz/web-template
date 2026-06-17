import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LapdGroup, LapdProfile } from '../../data-access/lapd-profile.model';
import { LapdProfileService } from '../../data-access/lapd-profile.service';

@Component({
  selector: 'app-lapd-assignments',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './lapd-assignments.container.html',
  styleUrl: './lapd-assignments.container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LapdAssignmentsContainer implements OnInit {
  groups: LapdGroup[] = [];
  profiles: LapdProfile[] = [];
  isLoading = false;
  isSaving = false;
  message = '';
  errorMessage = '';

  readonly assignForm = this.fb.group({
    groupId: [0, Validators.required],
    userId: [0, Validators.required],
    isLeader: [false],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly lapdProfileService: LapdProfileService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.lapdProfileService.getGroups().subscribe({
      next: (groups) => {
        this.groups = groups;
        this.lapdProfileService.getProfiles().subscribe({
          next: (profiles) => {
            this.profiles = profiles;
            this.isLoading = false;
            this.cdr.markForCheck();
          },
          error: () => {
            this.errorMessage = 'Unable to load profile list.';
            this.isLoading = false;
            this.cdr.markForCheck();
          },
        });
      },
      error: () => {
        this.errorMessage = 'Unable to load groups.';
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  submitAssignment(): void {
    if (this.assignForm.invalid) {
      this.assignForm.markAllAsTouched();
      return;
    }

    const raw = this.assignForm.getRawValue();
    this.isSaving = true;
    this.message = '';
    this.errorMessage = '';

    this.lapdProfileService
      .addGroupMember(raw.groupId!, {
        user_id: raw.userId!,
        is_leader: !!raw.isLeader,
      })
      .subscribe({
        next: () => {
          this.message = 'Assignment updated.';
          this.isSaving = false;
          this.cdr.markForCheck();
          this.loadData();
        },
        error: () => {
          this.errorMessage = 'Failed to update assignment.';
          this.isSaving = false;
          this.cdr.markForCheck();
        },
      });
  }

  getFullName(profile: LapdProfile): string {
    const fullName = `${profile.firsName || ''} ${profile.lastName || ''}`.trim();
    return fullName || profile.userName;
  }

  trackByGroup(_: number, group: LapdGroup): number {
    return group.id;
  }
}
