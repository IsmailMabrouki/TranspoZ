/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Driver } from '../../models/driver';

export interface FindDriverById1$Params {
  id: number;
}

export function findDriverById1(http: HttpClient, rootUrl: string, params: FindDriverById1$Params, context?: HttpContext): Observable<StrictHttpResponse<Driver>> {
  const rb = new RequestBuilder(rootUrl, findDriverById1.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Driver>;
    })
  );
}

findDriverById1.PATH = '/driver/drivers_list/{id}';
