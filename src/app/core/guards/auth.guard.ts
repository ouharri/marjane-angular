import {CanActivateFn} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    return true;
    // inject(AuthenticationService).isAuthenticated().pipe(
    // take(1),
    // map((status) => {
    //   console.log('auth status: ', status);
    //   if (!status) {
    //     return inject(Router).createUrlTree(['/login']);
    //   }
    //   return true;
    // })
    // );
};
