/* tslint:disable */
/* eslint-disable */
export interface DeliveryRequest {
  assignedDriverId?: number;
  customerName?: string;
  deliveryLocation?: string;
  estimatedDeliveryTime?: number;
  items?: string;
  pickupLocation?: string;
  status?: 'PENDING' | 'IN_PROGRESS' | 'DELIVERED';
}
