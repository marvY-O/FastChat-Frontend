import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = (route, state):
Observable<boolean | UrlTree> 
| Promise<boolean | UrlTree> 
| boolean 
| UrlTree=> {

return inject(AuthService).isAuthenticated()
  ? inject(Router).createUrlTree(['/home'])
  : true;
};