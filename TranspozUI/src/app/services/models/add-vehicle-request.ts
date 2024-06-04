/* tslint:disable */
/* eslint-disable */
export interface AddVehicleRequest {
  capacity?: number;
  color?: string;
  driverId?: number;
  licensePlate?: string;
  make?: string;
  model?: string;
  type?: 'CAR' | 'VAN' | 'TRUCK';
  year?: number;
}
