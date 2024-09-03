import { http } from 'msw';
import { urls } from '@/mocks/settings';

import { fetchAdminsHandler } from './admins/fetchAdmins';

export const handlers = [
  http.get(urls.fetchAdmins, fetchAdminsHandler),
];
