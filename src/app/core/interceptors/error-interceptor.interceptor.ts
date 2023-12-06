import { HttpInterceptorFn } from '@angular/common/http';

export const errorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
