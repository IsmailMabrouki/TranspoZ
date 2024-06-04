/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UpdateDeliveryStatus$Params {
  driver_id: number;
  id: number;
      body: string
}

export function updateDeliveryStatus(http: HttpClient, rootUrl: string, params: UpdateDeliveryStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, updateDeliveryStatus.PATH, 'put');
  if (params) {
    rb.path('driver_id', params.driver_id, {});
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

updateDeliveryStatus.PATH = '/driver/{driver_id}/deliveries/{id}/status';
