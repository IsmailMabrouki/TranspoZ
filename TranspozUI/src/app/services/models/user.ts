/* tslint:disable */
/* eslint-disable */
import { GrantedAuthority } from '../models/granted-authority';
import { Role } from '../models/role';
export interface User {
  accountLocked?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: Array<GrantedAuthority>;
  createdDate?: string;
  credentialsNonExpired?: boolean;
  dateOfBirth?: string;
  email?: string;
  enabled?: boolean;
  firstname?: string;
  fullName?: string;
  id?: number;
  lastModifiedDate?: string;
  lastname?: string;
  name?: string;
  password?: string;
  role?: Role;
  username?: string;
}
