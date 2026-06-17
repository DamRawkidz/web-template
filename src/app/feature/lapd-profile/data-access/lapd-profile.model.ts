export type LapdRole = 'staff' | 'leader' | 'monitor' | 'admin';

export interface LapdProfile {
  id: number;
  userName: string;
  firsName: string;
  lastName: string;
  email: string;
  lapd_code: string;
  department_id?: number;
  department_name?: string;
  rank: string;
  role_type: LapdRole;
  unit_code: string;
  is_active_duty: boolean;
}

export interface CreateLapdProfilePayload {
  userName: string;
  email?: string;
  password?: string;
  firsName?: string;
  lastName?: string;
  lapd_code?: string;
  department_id?: number;
  rank?: string;
  role_type?: LapdRole;
  unit_code?: string;
  is_active_duty?: boolean;
}

export interface LapdProfileFilter {
  search?: string;
  departmentId?: number | '';
  role?: string;
}

export interface UpdateLapdProfilePayload {
  firsName?: string;
  lastName?: string;
  lapd_code?: string;
  department_id?: number;
  rank?: string;
  role_type?: LapdRole;
  unit_code?: string;
  is_active_duty?: boolean;
}

export interface LapdGroup {
  id: number;
  name: string;
  description?: string;
  leader_user_id?: number;
  is_active: boolean;
  members?: LapdGroupMember[];
}

export interface CreateLapdGroupPayload {
  name: string;
  description?: string;
  leader_user_id?: number;
}

export interface UpdateLapdGroupPayload {
  name?: string;
  description?: string;
  leader_user_id?: number;
  is_active?: boolean;
}

export interface LapdGroupMember {
  id: number;
  user_id: number;
  is_leader: boolean;
  user?: LapdProfile;
}

export interface LeaderStaffLocation {
  user_id: number;
  user_name: string;
  full_name: string;
  badge_code: string;
  unit_code: string;
  lat: number;
  lng: number;
  duty_status: string;
  recorded_at?: string;
}

export interface IncidentQueueItem {
  id: number;
  event_description: string;
  status: string;
  create_by: string;
  create_date: string;
  event_lat: number;
  event_long: number;
  interesting_Tag?: {
    name?: string;
  };
}

export interface Department {
  id: number;
  name: string;
  is_active: boolean;
}

export interface CreateDepartmentPayload {
  name: string;
}

export interface UpdateDepartmentPayload {
  name?: string;
  is_active?: boolean;
}
