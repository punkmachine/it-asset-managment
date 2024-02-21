import { BranchState } from '@/entities/types/backend/response/branches';

export interface ICreateBranchPayload {
  title: string;
  description: string;
}

export interface IUpdateBranchPayload {
  title: string;
  description: string;
  state: BranchState;
}
