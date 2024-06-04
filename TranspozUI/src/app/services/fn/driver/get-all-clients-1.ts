/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Client } from '../../models/client';

export interface GetAllClients1$Params {
}

export function getAllClients1(http: HttpClient, rootUrl: string, params?: GetAllClients1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Client>>> {
  const rb = new RequestBuilder(rootUrl, getAllClients1.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Client>>;
    })
  );
}

getAllClients1.PATH = '/driver/clients_list';
