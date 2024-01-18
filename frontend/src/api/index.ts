import { client } from '@/api/clients';
import { users } from '@/api/modules/users';
import { branches } from '@/api/modules/branches';
import { equipments } from '@/api/modules/equipments';
import { auth } from '@/api/modules/auth';

export const api = {
  auth: auth(client),
  users: users(client),
  branches: branches(client),
  equipments: equipments(client),
};
