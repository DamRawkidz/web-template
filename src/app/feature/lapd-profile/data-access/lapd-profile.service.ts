import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  CreateLapdGroupPayload,
  CreateDepartmentPayload,
  CreateLapdProfilePayload,
  Department,
  IncidentQueueItem,
  LapdGroup,
  LeaderStaffLocation,
  LapdProfile,
  LapdProfileFilter,
  UpdateLapdGroupPayload,
  UpdateDepartmentPayload,
  UpdateLapdProfilePayload,
} from './lapd-profile.model';

@Injectable({
  providedIn: 'root',
})
export class LapdProfileService {
  private readonly baseUrl = `${environment.baseapi}/lapd/profiles`;
  private readonly groupUrl = `${environment.baseapi}/lapd/groups`;
  private readonly departmentUrl = `${environment.baseapi}/lapd/departments`;
  private readonly staffLocationsUrl = `${environment.baseapi}/lapd/leader/staff-locations`;
  private readonly incidentQueueUrl = `${environment.baseapi}/event/incidents/queue`;

  constructor(private readonly http: HttpClient) {}

  getProfiles(filter: LapdProfileFilter = {}): Observable<LapdProfile[]> {
    let params = new HttpParams();
    if (filter.search) {
      params = params.set('search', filter.search);
    }
    if (filter.departmentId !== undefined && filter.departmentId !== '') {
      params = params.set('departmentId', filter.departmentId);
    }
    if (filter.role) {
      params = params.set('role', filter.role);
    }

    return this.http
      .get<unknown>(this.baseUrl, { params })
      .pipe(map((payload) => this.extractList<LapdProfile>(payload)));
  }

  getProfileById(id: number): Observable<LapdProfile | undefined> {
    return this.getProfiles().pipe(map((profiles) => profiles.find((p) => p.id === id)));
  }

  updateProfile(
    id: number,
    payload: UpdateLapdProfilePayload,
  ): Observable<LapdProfile> {
    return this.http.put<LapdProfile>(`${this.baseUrl}/${id}`, payload);
  }

  createProfile(payload: CreateLapdProfilePayload): Observable<LapdProfile> {
    return this.http.post<LapdProfile>(this.baseUrl, payload);
  }

  getGroups(includeInactive = false): Observable<LapdGroup[]> {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http
      .get<unknown>(this.groupUrl, { params })
      .pipe(map((payload) => this.extractList<LapdGroup>(payload)));
  }

  createGroup(payload: CreateLapdGroupPayload): Observable<LapdGroup> {
    return this.http.post<LapdGroup>(this.groupUrl, payload);
  }

  updateGroup(id: number, payload: UpdateLapdGroupPayload): Observable<LapdGroup> {
    return this.http.put<LapdGroup>(`${this.groupUrl}/${id}`, payload);
  }

  deleteGroup(id: number): Observable<unknown> {
    return this.http.delete(`${this.groupUrl}/${id}`);
  }

  addGroupMember(
    groupId: number,
    payload: { user_id: number; is_leader: boolean },
  ): Observable<unknown> {
    return this.http.post(`${this.groupUrl}/${groupId}/members`, payload);
  }

  getDepartments(includeInactive = false): Observable<Department[]> {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http
      .get<unknown>(this.departmentUrl, { params })
      .pipe(map((payload) => this.extractList<Department>(payload)));
  }

  createDepartment(payload: CreateDepartmentPayload): Observable<Department> {
    return this.http.post<Department>(this.departmentUrl, payload);
  }

  updateDepartment(id: number, payload: UpdateDepartmentPayload): Observable<Department> {
    return this.http.put<Department>(`${this.departmentUrl}/${id}`, payload);
  }

  deleteDepartment(id: number): Observable<unknown> {
    return this.http.delete(`${this.departmentUrl}/${id}`);
  }

  getLeaderStaffLocations(): Observable<LeaderStaffLocation[]> {
    return this.http
      .get<unknown>(this.staffLocationsUrl)
      .pipe(map((payload) => this.extractList<LeaderStaffLocation>(payload)));
  }

  getIncidentQueue(status = 'pending'): Observable<IncidentQueueItem[]> {
    const params = new HttpParams().set('status', status);
    return this.http
      .get<unknown>(this.incidentQueueUrl, { params })
      .pipe(map((payload) => this.extractList<IncidentQueueItem>(payload)));
  }

  approveIncident(id: number): Observable<unknown> {
    return this.http.put(`${environment.baseapi}/event/incidents/${id}/approve`, {});
  }

  resolveIncident(id: number): Observable<unknown> {
    return this.http.put(`${environment.baseapi}/event/incidents/${id}/resolve`, {});
  }

  clearIncident(id: number): Observable<unknown> {
    return this.http.put(`${environment.baseapi}/event/incidents/${id}/clear`, {});
  }

  private extractList<T>(payload: unknown): T[] {
    if (Array.isArray(payload)) {
      return payload as T[];
    }

    if (payload && typeof payload === 'object') {
      const data = (payload as { data?: unknown }).data;
      if (Array.isArray(data)) {
        return data as T[];
      }
    }

    return [];
  }
}
