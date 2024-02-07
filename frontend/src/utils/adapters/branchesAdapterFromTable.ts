import type { IBranchInTable, ICell } from '@/entities/types/UI/table';
import type { IBranch } from '@/entities/types/backend/response/branches';
import { BranchState } from '@/entities/types/backend/response/branches';

function getReadableState(key: BranchState | 'default') {
  const dict = {
    ACTIVE: 'Активен',
    DELETED: 'Заблокирован',
    default: '...'
  };

  return dict[key] ? dict[key] : dict.default;
}

function branchesAdapterFromTable(branches: IBranch[]): IBranchInTable[] {
  return branches.map((branch, index) => {
    return {
      _id: branch._id,
      number: `${index + 1}`,
      title: branch.title ?? '',
      state: getReadableState(branch.state),
      description: branch.description ?? '',
    }
  });
}

export function getTableRows(branches: IBranch[]) {
  const branchesTable = branchesAdapterFromTable(branches);

  return branchesTable.map(branch => {
    const result: ICell[] = [];

    for (const key in branch) {
      result.push({
        key,
        title: branch[key as keyof IBranchInTable],
      });
    }

    return result;
  });
}
