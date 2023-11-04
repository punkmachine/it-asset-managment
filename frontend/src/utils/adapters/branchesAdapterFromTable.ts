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

export function getTableRows(branches: IBranch[]) {
  const branchesTable = branchesAdapterFromTable(branches);

  return branchesTable.map(branch => {
    let result: ICell[] = [];

    for (let key in branch) {
      result.push({
        key,
        title: branch[key as keyof IBranchInTable],
      });
    }

    return result;
  });
}
