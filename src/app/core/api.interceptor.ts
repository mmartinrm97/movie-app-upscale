import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {

  const headers = req.headers
  .set('accept', 'application/json')
  .set('Authorization', `Bearer ${environment.movieDbApiKey}`);

  const apiReq = req.clone({
    headers,
    url: req.url.startsWith('http') ? req.url : `${environment.movieDbUrl}${req.url}`
  });
  return next(apiReq);
};
