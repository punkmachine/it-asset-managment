import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import Cookies from 'js-cookie';
import router from '@/router';
import { useAdminsStore } from '@/store';

export default function (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  if (!to.meta.secure) {
    next();

    return;
  }

  const token = Cookies.get('token');
  const adminStore = useAdminsStore();

  if (!token || !adminStore.currentAdminId) {
    router.push('/login');

    return;
  }

  if (!adminStore.currentAdmin) {
    adminStore.fetchCurrentAdmin();
  }

  next();
}
