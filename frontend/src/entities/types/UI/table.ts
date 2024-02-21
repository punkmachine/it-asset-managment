// ui table component
export interface IColumn {
  key: string;
  title: string;
  width?: string;
}

export interface ICell {
  key: string;
  title: string;
}

// @todo: rename to TRow
export type TRows = ICell[];

export interface IUserInTable {
  number: string;
  fio: string;
  role: string;
  state: string;
  _id: string;
}

export interface IBranchInTable {
  _id: string;
  number: string;
  description: string;
  title: string;
}

export interface IEquipmentInTable {
  _id: string;
  number: string;
  inventoryNumber: string;
  serialNumber: string;
  assetNumber: string;
  name: string;
  createdDate: string;
  updatedDate: string;
  financiallyResponsiblePerson: string;
  state: string;
  branch: string;
}
