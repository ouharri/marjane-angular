import {CanActivateFn, Router} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {inject} from '@angular/core';
import {map, take} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthenticationService).isAuthenticated().pipe(
    take(1),
    map((status) => {
      console.log('auth status: ', status);
      if (!status) {
        return inject(Router).createUrlTree(['/login']);
      }
      return true;
    })
  );
};
