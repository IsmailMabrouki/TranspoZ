/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addVehicle } from '../fn/driver/add-vehicle';
import { AddVehicle$Params } from '../fn/driver/add-vehicle';
import { Client } from '../models/client';
import { deleteDriverById } from '../fn/driver/delete-driver-by-id';
import { DeleteDriverById$Params } from '../fn/driver/delete-driver-by-id';
import { Delivery } from '../models/delivery';
import { Driver } from '../models/driver';
import { findDriverById1 } from '../fn/driver/find-driver-by-id-1';
import { FindDriverById1$Params } from '../fn/driver/find-driver-by-id-1';
import { getAllClients1 } from '../fn/driver/get-all-clients-1';
import { GetAllClients1$Params } from '../fn/driver/get-all-clients-1';
import { getAllDrivers1 } from '../fn/driver/get-all-drivers-1';
import { GetAllDrivers1$Params } from '../fn/driver/get-all-drivers-1';
import { getAssignedDeliveries } from '../fn/driver/get-assigned-deliveries';
import { GetAssignedDeliveries$Params } from '../fn/driver/get-assigned-deliveries';
import { getClientById1 } from '../fn/driver/get-client-by-id-1';
import { GetClientById1$Params } from '../fn/driver/get-client-by-id-1';
import { getMyProfile1 } from '../fn/driver/get-my-profile-1';
import { GetMyProfile1$Params } from '../fn/driver/get-my-profile-1';
import { updateDeliveryStatus } from '../fn/driver/update-delivery-status';
import { UpdateDeliveryStatus$Params } from '../fn/driver/update-delivery-status';
import { updateDriver } from '../fn/driver/update-driver';
import { UpdateDriver$Params } from '../fn/driver/update-driver';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class DriverService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateDriver()` */
  static readonly UpdateDriverPath = '/driver/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDriver()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDriver$Response(params: UpdateDriver$Params, context?: HttpContext): Observable<StrictHttpResponse<Driver>> {
    return updateDriver(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateDriver$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDriver(params: UpdateDriver$Params, context?: HttpContext): Observable<Driver> {
    return this.updateDriver$Response(params, context).pipe(
      map((r: StrictHttpResponse<Driver>): Driver => r.body)
    );
  }

  /** Path part for operation `deleteDriverById()` */
  static readonly DeleteDriverByIdPath = '/driver/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDriverById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDriverById$Response(params: DeleteDriverById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteDriverById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteDriverById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDriverById(params: DeleteDriverById$Params, context?: HttpContext): Observable<void> {
    return this.deleteDriverById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `updateDeliveryStatus()` */
  static readonly UpdateDeliveryStatusPath = '/driver/{driver_id}/deliveries/{id}/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDeliveryStatus()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDeliveryStatus$Response(params: UpdateDeliveryStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return updateDeliveryStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateDeliveryStatus$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDeliveryStatus(params: UpdateDeliveryStatus$Params, context?: HttpContext): Observable<void> {
    return this.updateDeliveryStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `addVehicle()` */
  static readonly AddVehiclePath = '/driver/{id}/addVehicle';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addVehicle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addVehicle$Response(params: AddVehicle$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return addVehicle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addVehicle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addVehicle(params: AddVehicle$Params, context?: HttpContext): Observable<void> {
    return this.addVehicle$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAssignedDeliveries()` */
  static readonly GetAssignedDeliveriesPath = '/driver/{id}/deliveries/assigned';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAssignedDeliveries()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAssignedDeliveries$Response(params: GetAssignedDeliveries$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Delivery>>> {
    return getAssignedDeliveries(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAssignedDeliveries$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAssignedDeliveries(params: GetAssignedDeliveries$Params, context?: HttpContext): Observable<Array<Delivery>> {
    return this.getAssignedDeliveries$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Delivery>>): Array<Delivery> => r.body)
    );
  }

  /** Path part for operation `getMyProfile1()` */
  static readonly GetMyProfile1Path = '/driver/profile/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMyProfile1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyProfile1$Response(params: GetMyProfile1$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return getMyProfile1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMyProfile1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyProfile1(params: GetMyProfile1$Params, context?: HttpContext): Observable<User> {
    return this.getMyProfile1$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getAllDrivers1()` */
  static readonly GetAllDrivers1Path = '/driver/drivers_list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllDrivers1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllDrivers1$Response(params?: GetAllDrivers1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Driver>>> {
    return getAllDrivers1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllDrivers1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllDrivers1(params?: GetAllDrivers1$Params, context?: HttpContext): Observable<Array<Driver>> {
    return this.getAllDrivers1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Driver>>): Array<Driver> => r.body)
    );
  }

  /** Path part for operation `findDriverById1()` */
  static readonly FindDriverById1Path = '/driver/drivers_list/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findDriverById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findDriverById1$Response(params: FindDriverById1$Params, context?: HttpContext): Observable<StrictHttpResponse<Driver>> {
    return findDriverById1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findDriverById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findDriverById1(params: FindDriverById1$Params, context?: HttpContext): Observable<Driver> {
    return this.findDriverById1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Driver>): Driver => r.body)
    );
  }

  /** Path part for operation `getAllClients1()` */
  static readonly GetAllClients1Path = '/driver/clients_list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllClients1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllClients1$Response(params?: GetAllClients1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Client>>> {
    return getAllClients1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllClients1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllClients1(params?: GetAllClients1$Params, context?: HttpContext): Observable<Array<Client>> {
    return this.getAllClients1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Client>>): Array<Client> => r.body)
    );
  }

  /** Path part for operation `getClientById1()` */
  static readonly GetClientById1Path = '/driver/clients_list/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getClientById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getClientById1$Response(params: GetClientById1$Params, context?: HttpContext): Observable<StrictHttpResponse<Client>> {
    return getClientById1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getClientById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getClientById1(params: GetClientById1$Params, context?: HttpContext): Observable<Client> {
    return this.getClientById1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Client>): Client => r.body)
    );
  }

}
