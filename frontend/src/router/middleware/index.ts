import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import Cookies from 'js-cookie';
import router from '@/router';

export default function (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  if (!to.meta.secure) {
    next();

    return;
  }

  const token = Cookies.get('token');

  if (!token) {
    router.push('/login');

    return;
  }

  next();
}
