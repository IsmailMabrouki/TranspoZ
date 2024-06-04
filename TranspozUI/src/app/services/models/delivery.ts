/* tslint:disable */
/* eslint-disable */
import { Driver } from '../models/driver';
export interface Delivery {
  assignedDriver?: Driver;
  customerId?: number;
  customerName: string;
  deliveryLocation?: string;
  estimatedDeliveryTime?: number;
  id?: number;
  items?: string;
  pickupLocation?: string;
  status?: 'PENDING' | 'IN_PROGRESS' | 'DELIVERED';
  statusDescription?: string;
}
