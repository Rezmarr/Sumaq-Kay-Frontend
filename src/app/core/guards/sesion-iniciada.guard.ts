import { inject } from '@angular/core';
import {
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ENCRYPT_KEYS } from 'src/environments/encrypt-keys/encrypt-keys';
import { NAME_KEYS } from 'src/environments/name-keys/name-keys';
import { ROUTES_URL } from '../constants/routes.constant';
import { AuthService } from '../controllers/services/auth/auth.service';
import { EncryptUtil } from '../utils/encrypt.util';

export const sesionIniciadaGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return validate(authService, router, state);
};

export const sesionIniciadaChildGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return validate(authService, router, state);
};

const validate = (
  authService: AuthService,
  router: Router,
  state: RouterStateSnapshot
) => {
  if (authService.existeSesion()) return true;

  return router.createUrlTree([ROUTES_URL.auth.login]);
};
