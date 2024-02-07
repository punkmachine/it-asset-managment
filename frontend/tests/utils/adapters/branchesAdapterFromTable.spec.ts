import { describe, expect, it } from 'vitest';

import type { IBranch } from '@/entities/types/backend/response/branches';

import { BranchState } from '@/entities/types/backend/response/branches';
import { getTableRows } from '@/utils/adapters/branchesAdapterFromTable';

describe('utils/adapters/branchesAdapterFromTable.ts', () => {
  it('Стандартный кейс работы адаптера', () => {
    const branches: IBranch[] = [
      {
        _id: '1',
        createdDate: '2022-01-21',
        title: 'Branch 1',
        description: 'Description 1',
        state: BranchState.active
      },
    ];

    const result = getTableRows(branches);

    expect(result).toEqual([
      [
        { key: '_id', title: '1' },
        { key: 'number', title: '1' },
        { key: 'title', title: 'Branch 1' },
        { key: 'state', title: 'Активен' },
        { key: 'description', title: 'Description 1' },
      ],
    ]);
  });

  it('Передача неполных данных в адаптере', () => {
    const branches: IBranch[] = [
      {
        _id: '1',
        description: 'Description 1',
        state: BranchState.deleted
      },
    ];

    const result = getTableRows(branches);

    expect(result).toEqual([
      [
        { key: '_id', title: '1' },
        { key: 'number', title: '1' },
        { key: 'title', title: '' },
        { key: 'state', title: 'Заблокирован' },
        { key: 'description', title: 'Description 1' },
      ],
    ]);
  });

  it('Передача пустого массива в адаптер', () => {
    const branches: IBranch[] = [];

    const result = getTableRows(branches);

    expect(result).toEqual([]);
  });
});
