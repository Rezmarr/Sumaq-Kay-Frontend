import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { ROUTES_URL } from '../constants/routes.constant';
import { AuthService } from '../controllers/services/auth/auth.service';

export const sesionNoIniciadaGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return validate(authService, router);
};

export const sesionNoIniciadaChildGuard: CanActivateChildFn = (
  route,
  state
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return validate(authService, router);
};

const validate = (authService: AuthService, router: Router) => {
  if (!authService.existeSesion()) return true;

  router.navigateByUrl(ROUTES_URL.inicio);

  return false;
};
