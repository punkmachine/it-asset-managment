import type { IAdminInTable, ICell } from '@/entities/types/UI/table';
import type { IAdmin } from '@/entities/types/backend/response/admins';
import { AdminState, AdminRoles } from '@/entities/types/backend/response/admins';

function getReadableRole(key: AdminRoles | 'default') {
  const dict = {
    SUPERADMIN: 'Царь',
    ADMIN: 'Администратор',
    default: '...',
  };

  return dict[key] ? dict[key] : dict.default;
}

function getReadableState(key: AdminState | 'default') {
  const dict = {
    ACTIVE: 'Активен',
    DELETED: 'Заблокирован',
    default: '...',
  };

  return dict[key] ? dict[key] : dict.default;
}

function adminsAdapterFromTable(admins: IAdmin[]): IAdminInTable[] {
  return admins.map((admin, index) => {
    return {
      _id: admin._id,
      number: `${index + 1}`,
      fio: `${admin.firstName} ${admin.lastName}`,
      role: getReadableRole(admin.role),
      state: getReadableState(admin.state),
    };
  });
}

export function getTableRows(admins: IAdmin[]) {
  const adminsTable = adminsAdapterFromTable(admins);

  return adminsTable.map(admin => {
    const result: ICell[] = [];

    for (const key in admin) {
      result.push({
        key,
        title: admin[key as keyof IAdminInTable],
      });
    }

    return result;
  });
}
