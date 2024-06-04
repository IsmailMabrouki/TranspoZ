/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Client } from '../models/client';
import { createClient } from '../fn/client/create-client';
import { CreateClient$Params } from '../fn/client/create-client';
import { createDelivery } from '../fn/client/create-delivery';
import { CreateDelivery$Params } from '../fn/client/create-delivery';
import { deleteClient } from '../fn/client/delete-client';
import { DeleteClient$Params } from '../fn/client/delete-client';
import { Delivery } from '../models/delivery';
import { Driver } from '../models/driver';
import { findDriverById } from '../fn/client/find-driver-by-id';
import { FindDriverById$Params } from '../fn/client/find-driver-by-id';
import { getAllClients } from '../fn/client/get-all-clients';
import { GetAllClients$Params } from '../fn/client/get-all-clients';
import { getAllDrivers } from '../fn/client/get-all-drivers';
import { GetAllDrivers$Params } from '../fn/client/get-all-drivers';
import { getClientById } from '../fn/client/get-client-by-id';
import { GetClientById$Params } from '../fn/client/get-client-by-id';
import { getMyDeliveries } from '../fn/client/get-my-deliveries';
import { GetMyDeliveries$Params } from '../fn/client/get-my-deliveries';
import { getMyProfile } from '../fn/client/get-my-profile';
import { GetMyProfile$Params } from '../fn/client/get-my-profile';
import { updateClient } from '../fn/client/update-client';
import { UpdateClient$Params } from '../fn/client/update-client';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class ClientService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateClient()` */
  static readonly UpdateClientPath = '/user/clients/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateClient()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateClient$Response(params: UpdateClient$Params, context?: HttpContext): Observable<StrictHttpResponse<Client>> {
    return updateClient(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateClient$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateClient(params: UpdateClient$Params, context?: HttpContext): Observable<Client> {
    return this.updateClient$Response(params, context).pipe(
      map((r: StrictHttpResponse<Client>): Client => r.body)
    );
  }

  /** Path part for operation `deleteClient()` */
  static readonly DeleteClientPath = '/user/clients/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteClient()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteClient$Response(params: DeleteClient$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteClient(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteClient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteClient(params: DeleteClient$Params, context?: HttpContext): Observable<void> {
    return this.deleteClient$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `createDelivery()` */
  static readonly CreateDeliveryPath = '/user/{id}/deliveries/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createDelivery()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDelivery$Response(params: CreateDelivery$Params, context?: HttpContext): Observable<StrictHttpResponse<Delivery>> {
    return createDelivery(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createDelivery$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDelivery(params: CreateDelivery$Params, context?: HttpContext): Observable<Delivery> {
    return this.createDelivery$Response(params, context).pipe(
      map((r: StrictHttpResponse<Delivery>): Delivery => r.body)
    );
  }

  /** Path part for operation `createClient()` */
  static readonly CreateClientPath = '/user/become-client';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createClient()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createClient$Response(params: CreateClient$Params, context?: HttpContext): Observable<StrictHttpResponse<Client>> {
    return createClient(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createClient$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createClient(params: CreateClient$Params, context?: HttpContext): Observable<Client> {
    return this.createClient$Response(params, context).pipe(
      map((r: StrictHttpResponse<Client>): Client => r.body)
    );
  }

  /** Path part for operation `getMyDeliveries()` */
  static readonly GetMyDeliveriesPath = '/user/{id}/deliveries/mine';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMyDeliveries()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyDeliveries$Response(params: GetMyDeliveries$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Delivery>>> {
    return getMyDeliveries(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMyDeliveries$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyDeliveries(params: GetMyDeliveries$Params, context?: HttpContext): Observable<Array<Delivery>> {
    return this.getMyDeliveries$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Delivery>>): Array<Delivery> => r.body)
    );
  }

  /** Path part for operation `getMyProfile()` */
  static readonly GetMyProfilePath = '/user/profile/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMyProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyProfile$Response(params: GetMyProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return getMyProfile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMyProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyProfile(params: GetMyProfile$Params, context?: HttpContext): Observable<User> {
    return this.getMyProfile$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getAllDrivers()` */
  static readonly GetAllDriversPath = '/user/drivers_list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllDrivers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllDrivers$Response(params?: GetAllDrivers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Driver>>> {
    return getAllDrivers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllDrivers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllDrivers(params?: GetAllDrivers$Params, context?: HttpContext): Observable<Array<Driver>> {
    return this.getAllDrivers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Driver>>): Array<Driver> => r.body)
    );
  }

  /** Path part for operation `findDriverById()` */
  static readonly FindDriverByIdPath = '/user/drivers_list/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findDriverById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findDriverById$Response(params: FindDriverById$Params, context?: HttpContext): Observable<StrictHttpResponse<Driver>> {
    return findDriverById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findDriverById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findDriverById(params: FindDriverById$Params, context?: HttpContext): Observable<Driver> {
    return this.findDriverById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Driver>): Driver => r.body)
    );
  }

  /** Path part for operation `getAllClients()` */
  static readonly GetAllClientsPath = '/user/clients_list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllClients()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllClients$Response(params?: GetAllClients$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Client>>> {
    return getAllClients(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllClients$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllClients(params?: GetAllClients$Params, context?: HttpContext): Observable<Array<Client>> {
    return this.getAllClients$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Client>>): Array<Client> => r.body)
    );
  }

  /** Path part for operation `getClientById()` */
  static readonly GetClientByIdPath = '/user/clients_list/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getClientById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getClientById$Response(params: GetClientById$Params, context?: HttpContext): Observable<StrictHttpResponse<Client>> {
    return getClientById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getClientById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getClientById(params: GetClientById$Params, context?: HttpContext): Observable<Client> {
    return this.getClientById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Client>): Client => r.body)
    );
  }

}
