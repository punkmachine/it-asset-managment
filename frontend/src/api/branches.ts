import type { IBranch } from '@/entities/types/backend/response/branches';
import { BranchState } from '@/entities/types/backend/response/branches';
import type { INewBranch } from '@/views/branches/types';

export function fetchBranches(): Promise<IBranch[]> {
  return new Promise((resolve, reject) => {
    resolve([
      {
        id: 1,
        createdDate: '2023-10-22T04:55:58.867Z',
        updatedDate: '2023-10-22T04:55:58.867Z',
        title: 'Филиал в Алматы',
        description: 'Филиал в Алматы',
        state: BranchState.active
      },
      {
        id: 2,
        createdDate: '2023-10-22T04:55:58.867Z',
        updatedDate: '2023-10-22T04:55:58.867Z',
        title: 'Филиал в Астане',
        description: 'Филиал в Астане',
        state: BranchState.active
      },
    ]);
  });
}

export function getBranchById(id: string | number): Promise<IBranch> {
  return new Promise((resolve, reject) => {
    resolve({
      id: +id,
      createdDate: '2023-10-22T04:55:58.867Z',
      updatedDate: '2023-10-22T04:55:58.867Z',
      title: 'Филиал в Алматы',
      description: 'Филиал в Алматы',
      state: BranchState.active
    });
  });
}

export function deleteBranch(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    resolve(true);
  });
}

export function editBranch(branch: IBranch): Promise<IBranch> {
  return new Promise((resolve, reject) => {
    resolve(branch);
  });
}

export function postBranch(newBranch: INewBranch): Promise<IBranch> {
  return new Promise((resolve, reject) => {
    resolve({
      ...newBranch,
      id: 3,
      createdDate: '2023-10-22T04:55:58.867Z',
      updatedDate: '2023-10-22T04:55:58.867Z',
      state: BranchState.active,
    })
  });
}
