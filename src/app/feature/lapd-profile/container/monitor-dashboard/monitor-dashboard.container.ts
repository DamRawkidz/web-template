import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {
  IncidentQueueItem,
  LeaderStaffLocation,
} from '../../data-access/lapd-profile.model';
import { LapdProfileService } from '../../data-access/lapd-profile.service';

@Component({
  selector: 'app-monitor-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './monitor-dashboard.container.html',
  styleUrl: './monitor-dashboard.container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitorDashboardContainer implements OnInit {
  incidents: IncidentQueueItem[] = [];
  staffLocations: LeaderStaffLocation[] = [];
  selectedStatus = 'pending';
  isLoading = false;
  errorMessage = '';

  constructor(
    private readonly lapdProfileService: LapdProfileService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.lapdProfileService.getIncidentQueue(this.selectedStatus).subscribe({
      next: (incidents) => {
        this.incidents = incidents;
        this.lapdProfileService.getLeaderStaffLocations().subscribe({
          next: (locations) => {
            this.staffLocations = locations;
            this.isLoading = false;
            this.cdr.markForCheck();
          },
          error: () => {
            this.errorMessage = 'Unable to load staff locations.';
            this.isLoading = false;
            this.cdr.markForCheck();
          },
        });
      },
      error: () => {
        this.errorMessage = 'Unable to load incident queue.';
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  onStatusChange(): void {
    this.refresh();
  }

  getTagName(incident: IncidentQueueItem): string {
    return incident.interesting_Tag?.name || 'Incident';
  }

  approve(incidentId: number): void {
    this.lapdProfileService.approveIncident(incidentId).subscribe(() => this.refresh());
  }

  resolve(incidentId: number): void {
    this.lapdProfileService.resolveIncident(incidentId).subscribe(() => this.refresh());
  }

  clear(incidentId: number): void {
    this.lapdProfileService.clearIncident(incidentId).subscribe(() => this.refresh());
  }

  canApprove(status: string): boolean {
    return (status || '').toLowerCase() === 'pending';
  }

  canResolve(status: string): boolean {
    return (status || '').toLowerCase() === 'approved';
  }

  canClear(status: string): boolean {
    return (status || '').toLowerCase() === 'resolved';
  }

  markerStyle(staff: LeaderStaffLocation): { [key: string]: string } {
    const points = this.staffLocations.filter((s) => s.lat && s.lng);
    if (!points.length) {
      return { left: '50%', top: '50%' };
    }

    const lats = points.map((p) => p.lat);
    const lngs = points.map((p) => p.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const latRange = Math.max(maxLat - minLat, 0.0001);
    const lngRange = Math.max(maxLng - minLng, 0.0001);

    const left = ((staff.lng - minLng) / lngRange) * 100;
    const top = ((maxLat - staff.lat) / latRange) * 100;

    return {
      left: `${Math.max(4, Math.min(96, left))}%`,
      top: `${Math.max(6, Math.min(94, top))}%`,
    };
  }
}
