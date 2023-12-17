// ui table component
export interface IColumn {
  key: string,
  title: string,
  width?: string,
};

export interface ICell {
  key: string,
  title: string,
}

// @todo: rename to TRow
export type TRows = ICell[];

export interface IUserInTable {
  id: string,
  fio: string,
};

export interface IBranchInTable {
  id: string,
  description: string,
  title: string,
};

export interface IEquipmentInTable {
  id: string,
  inventoryNumber: string,
  serialNumber: string,
  assetNumber: string,
  name: string,
  createdDate: string,
  updatedDate: string,
  financiallyResponsiblePerson: string,
};
