import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';


import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class RequestsInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({ 
      url: environment.BASE_URL + req.url 
    });
    return next.handle(request);
  }
}