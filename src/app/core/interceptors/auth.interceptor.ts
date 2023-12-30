import { HttpInterceptorFn } from '@angular/common/http';
import { AUTH_TOKEN_KEY } from '../constants/auth-token-key';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
