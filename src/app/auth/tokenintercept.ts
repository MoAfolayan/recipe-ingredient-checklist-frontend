import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class TokenIntercept implements HttpInterceptor {

    constructor(
        private authService: AuthService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        const headers = {};

        if (token !== null) {
            headers['Authorization'] = 'Bearer ' + token;
        }

        const modified = request.clone(
            {
                setHeaders: headers,
            }
        );
        return next.handle(modified);
    }
}