import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import Cookies from 'js-cookie';
import router from '@/router';
import { useUsersStore } from '@/store';

export default function (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  if (!to.meta.secure) {
    next();

    return;
  }

  const token = Cookies.get('token');
  const userStore = useUsersStore();

  if (!token || !userStore.currentUserId) {
    router.push('/login');

    return;
  }

  if (!userStore.currentUser) {
    userStore.fetchCurrentUser();
  }

  next();
}
