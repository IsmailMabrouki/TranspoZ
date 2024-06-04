/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Driver } from '../../models/driver';

export interface GetAllDrivers$Params {
}

export function getAllDrivers(http: HttpClient, rootUrl: string, params?: GetAllDrivers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Driver>>> {
  const rb = new RequestBuilder(rootUrl, getAllDrivers.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Driver>>;
    })
  );
}

getAllDrivers.PATH = '/user/drivers_list';
