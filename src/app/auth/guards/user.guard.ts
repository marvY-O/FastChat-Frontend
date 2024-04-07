import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state):
Observable<boolean | UrlTree> 
| Promise<boolean | UrlTree> 
| boolean 
| UrlTree=> {

return inject(AuthService).isAuthenticated()
  ? true
  : inject(Router).createUrlTree(['']);
};
