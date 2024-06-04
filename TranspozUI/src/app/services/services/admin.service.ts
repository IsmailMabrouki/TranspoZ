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
import { deleteUser } from '../fn/admin/delete-user';
import { DeleteUser$Params } from '../fn/admin/delete-user';
import { Driver } from '../models/driver';
import { getAllClients2 } from '../fn/admin/get-all-clients-2';
import { GetAllClients2$Params } from '../fn/admin/get-all-clients-2';
import { getAllDrivers2 } from '../fn/admin/get-all-drivers-2';
import { GetAllDrivers2$Params } from '../fn/admin/get-all-drivers-2';
import { getAllUsers } from '../fn/admin/get-all-users';
import { GetAllUsers$Params } from '../fn/admin/get-all-users';
import { getMyProfile2 } from '../fn/admin/get-my-profile-2';
import { GetMyProfile2$Params } from '../fn/admin/get-my-profile-2';
import { getUserById } from '../fn/admin/get-user-by-id';
import { GetUserById$Params } from '../fn/admin/get-user-by-id';
import { updateUser } from '../fn/admin/update-user';
import { UpdateUser$Params } from '../fn/admin/update-user';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AdminService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllUsers()` */
  static readonly GetAllUsersPath = '/admin/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Response(params?: GetAllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<User>>> {
    return getAllUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers(params?: GetAllUsers$Params, context?: HttpContext): Observable<Array<User>> {
    return this.getAllUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }

  /** Path part for operation `updateUser()` */
  static readonly UpdateUserPath = '/admin/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser$Response(params: UpdateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return updateUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser(params: UpdateUser$Params, context?: HttpContext): Observable<User> {
    return this.updateUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getUserById()` */
  static readonly GetUserByIdPath = '/admin/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Response(params: GetUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return getUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById(params: GetUserById$Params, context?: HttpContext): Observable<User> {
    return this.getUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `deleteUser()` */
  static readonly DeleteUserPath = '/admin/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params: DeleteUser$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deleteUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params: DeleteUser$Params, context?: HttpContext): Observable<string> {
    return this.deleteUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getMyProfile2()` */
  static readonly GetMyProfile2Path = '/admin/profile/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMyProfile2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyProfile2$Response(params: GetMyProfile2$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return getMyProfile2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMyProfile2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyProfile2(params: GetMyProfile2$Params, context?: HttpContext): Observable<User> {
    return this.getMyProfile2$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getAllDrivers2()` */
  static readonly GetAllDrivers2Path = '/admin/drivers_list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllDrivers2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllDrivers2$Response(params?: GetAllDrivers2$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Driver>>> {
    return getAllDrivers2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllDrivers2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllDrivers2(params?: GetAllDrivers2$Params, context?: HttpContext): Observable<Array<Driver>> {
    return this.getAllDrivers2$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Driver>>): Array<Driver> => r.body)
    );
  }

  /** Path part for operation `getAllClients2()` */
  static readonly GetAllClients2Path = '/admin/clients_list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllClients2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllClients2$Response(params?: GetAllClients2$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Client>>> {
    return getAllClients2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllClients2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllClients2(params?: GetAllClients2$Params, context?: HttpContext): Observable<Array<Client>> {
    return this.getAllClients2$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Client>>): Array<Client> => r.body)
    );
  }

}
