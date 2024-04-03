import { client } from '@/api/clients';
import { admins } from '@/api/modules/admins';
import { branches } from '@/api/modules/branches';
import { equipments } from '@/api/modules/equipments';
import { auth } from '@/api/modules/auth';

export const api = {
  auth: auth(client),
  admins: admins(client),
  branches: branches(client),
  equipments: equipments(client),
};
