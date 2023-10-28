export enum BranchState {
  active = "ACTIVE",
  deleted = "DELETED",
};

export interface IBranch {
  id: number,
  createdDate: string,
  updatedDate: string,
  title: string,
  description: string,
  state: BranchState,
};
