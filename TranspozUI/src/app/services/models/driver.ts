/* tslint:disable */
/* eslint-disable */
import { Location } from '../models/location';
import { Vehicle } from '../models/vehicle';
export interface Driver {
  available?: boolean;
  currentLocation?: Location;
  email?: string;
  id?: number;
  name?: string;
  phoneNumber?: string;
  rating?: number;
  vehicle?: Vehicle;
}
