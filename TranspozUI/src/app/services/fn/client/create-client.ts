/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Client } from '../../models/client';

export interface CreateClient$Params {
      body: Client
}

export function createClient(http: HttpClient, rootUrl: string, params: CreateClient$Params, context?: HttpContext): Observable<StrictHttpResponse<Client>> {
  const rb = new RequestBuilder(rootUrl, createClient.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Client>;
    })
  );
}

createClient.PATH = '/user/become-client';
