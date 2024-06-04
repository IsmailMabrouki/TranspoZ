/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Delivery } from '../../models/delivery';
import { DeliveryRequest } from '../../models/delivery-request';

export interface CreateDelivery$Params {
  id: number;
      body: DeliveryRequest
}

export function createDelivery(http: HttpClient, rootUrl: string, params: CreateDelivery$Params, context?: HttpContext): Observable<StrictHttpResponse<Delivery>> {
  const rb = new RequestBuilder(rootUrl, createDelivery.PATH, 'post');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Delivery>;
    })
  );
}

createDelivery.PATH = '/user/{id}/deliveries/create';
