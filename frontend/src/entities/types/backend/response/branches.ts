export enum BranchState {
  active = "ACTIVE",
  deleted = "DELETED",
};

export interface IBranch {
  _id: string,
  createdDate: string,
  updatedDate: string,
  title: string,
  description: string,
  state: BranchState,
};
