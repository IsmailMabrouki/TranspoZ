/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Delivery } from '../../models/delivery';

export interface GetMyDeliveries$Params {
  id: number;
}

export function getMyDeliveries(http: HttpClient, rootUrl: string, params: GetMyDeliveries$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Delivery>>> {
  const rb = new RequestBuilder(rootUrl, getMyDeliveries.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Delivery>>;
    })
  );
}

getMyDeliveries.PATH = '/user/{id}/deliveries/mine';
