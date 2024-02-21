import type { IUserInTable, ICell } from '@/entities/types/UI/table';
import type { IUser } from '@/entities/types/backend/response/user';
import { UserState, UserRoles } from '@/entities/types/backend/response/user';

function getReadableRole(key: UserRoles | 'default') {
  const dict = {
    SUPERADMIN: 'Царь',
    ADMIN: 'Администратор',
    default: '...',
  };

  return dict[key] ? dict[key] : dict.default;
}

function getReadableState(key: UserState | 'default') {
  const dict = {
    ACTIVE: 'Активен',
    DELETED: 'Заблокирован',
    default: '...',
  };

  return dict[key] ? dict[key] : dict.default;
}

function usersAdapterFromTable(users: IUser[]): IUserInTable[] {
  return users.map((user, index) => {
    return {
      _id: user._id,
      number: `${index + 1}`,
      fio: `${user.firstName} ${user.lastName}`,
      role: getReadableRole(user.role),
      state: getReadableState(user.state),
    };
  });
}

export function getTableRows(users: IUser[]) {
  const usersTable = usersAdapterFromTable(users);

  return usersTable.map(user => {
    const result: ICell[] = [];

    for (const key in user) {
      result.push({
        key,
        title: user[key as keyof IUserInTable],
      });
    }

    return result;
  });
}
