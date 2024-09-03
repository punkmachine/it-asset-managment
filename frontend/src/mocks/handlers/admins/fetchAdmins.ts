import { HttpResponse } from 'msw';
import { fetchAdmins } from '@/mocks/data/admins/fetchAdmins';

export function fetchAdminsHandler() {
  return HttpResponse.json(fetchAdmins(), {
    status: 200,
  });
}
