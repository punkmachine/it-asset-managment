import type { IBranchInTable, ICell } from '@/entities/types/UI/table';
import type { IBranch } from '@/entities/types/backend/branches';

function branchesAdapterFromTable(branches: IBranch[]): IBranchInTable[] {
  return branches.map(branch => {
    return {
      id: branch.id.toString(),
      title: branch.title,
      description: branch.description,
    }
  });
}

export function getTableRows(users: IBranch[]) {
  const usersTable = branchesAdapterFromTable(users);

  return usersTable.map(user => {
    let result: ICell[] = [];

    for (let key in user) {
      result.push({
        key,
        title: user[key as keyof IBranchInTable],
      });
    }

    return result;
  });
}
