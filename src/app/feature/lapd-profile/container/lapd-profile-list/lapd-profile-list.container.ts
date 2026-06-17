import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Department, LapdProfile, LapdRole } from '../../data-access/lapd-profile.model';
import { LapdProfileService } from '../../data-access/lapd-profile.service';

@Component({
  selector: 'app-lapd-profile-list',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './lapd-profile-list.container.html',
  styleUrl: './lapd-profile-list.container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LapdProfileListContainer implements OnInit {
  readonly roles: LapdRole[] = ['staff', 'leader', 'monitor', 'admin'];

  profiles: LapdProfile[] = [];
  departments: Department[] = [];
  isLoading = false;
  errorMessage = '';

  readonly filterForm = this.fb.group({
    search: [''],
    departmentId: [<number | ''>''],
    role: [''],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly lapdProfileService: LapdProfileService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.loadProfiles();
  }

  loadDepartments(): void {
    this.lapdProfileService.getDepartments(true).subscribe({
      next: (departments) => {
        this.departments = departments;
        this.cdr.markForCheck();
      },
    });
  }

  loadProfiles(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.lapdProfileService.getProfiles(this.filterForm.getRawValue()).subscribe({
      next: (profiles) => {
        this.profiles = profiles;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Unable to load LAPD profiles. Check API URL and auth token.';
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  onSearch(): void {
    this.loadProfiles();
  }

  onReset(): void {
    this.filterForm.reset({ search: '', departmentId: '', role: '' });
    this.loadProfiles();
  }

  editProfile(profile: LapdProfile): void {
    this.router.navigate(['/app/lapd-profile', profile.id]);
  }

  createProfile(): void {
    this.router.navigate(['/app/lapd-profile/add-user']);
  }

  trackById(_: number, item: LapdProfile): number {
    return item.id;
  }

  getFullName(profile: LapdProfile): string {
    const fullName = `${profile.firsName || ''} ${profile.lastName || ''}`.trim();
    return fullName || profile.userName;
  }

  getDutyLabel(profile: LapdProfile): string {
    return profile.is_active_duty ? 'On Duty' : 'Offline';
  }

  get activeSupervisor(): LapdProfile | undefined {
    return this.profiles[0];
  }

  get activeDepartment(): string {
    return this.getDepartmentName(this.activeSupervisor);
  }

  get activeSquadMembers(): LapdProfile[] {
    const activeDepartmentId = this.activeSupervisor?.department_id;
    if (!activeDepartmentId) {
      return this.profiles.slice(0, 12);
    }

    return this.profiles
      .filter((profile) => profile.department_id === activeDepartmentId)
      .slice(0, 12);
  }

  get otherDivisions(): Array<{ name: string; count: number }> {
    const result = new Map<string, number>();
    for (const profile of this.profiles) {
      const departmentName = this.getDepartmentName(profile);
      result.set(departmentName, (result.get(departmentName) || 0) + 1);
    }

    return [...result.entries()]
      .filter(([name]) => name !== this.activeDepartment)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }

  trackByDivision(_: number, item: { name: string }): string {
    return item.name;
  }

  getCoverageStyle(index: number): { [key: string]: string } {
    const points = [
      { top: 20, left: 18 },
      { top: 44, left: 62 },
      { top: 66, left: 38 },
      { top: 30, left: 77 },
      { top: 74, left: 81 },
    ];
    const point = points[index % points.length];
    return {
      top: `${point.top}%`,
      left: `${point.left}%`,
    };
  }

  get hasProfiles(): boolean {
    return this.profiles.length > 0;
  }

  getDepartmentName(profile?: LapdProfile): string {
    if (!profile) {
      return 'Unassigned';
    }

    if (profile.department_name) {
      return profile.department_name;
    }

    if (!profile.department_id) {
      return 'Unassigned';
    }

    const department = this.departments.find((item) => item.id === profile.department_id);
    return department?.name || `Department #${profile.department_id}`;
  }
}
