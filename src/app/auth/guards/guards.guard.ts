import { inject } from '@angular/core';
import { AuthServiceService } from './../services/auth-service.service';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../interfaces';


export const guardsGuard: CanActivateFn = (route, state) => {

  const authServiceService = inject(AuthServiceService);
  const router = inject(Router);

  if(authServiceService.authStatus() === AuthStatus.aunthenticated) return true;


  router.navigateByUrl('/auth/login');

  return false;
};
