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

export type TRows = ICell[];

export interface IUserInTable {
  id: string,
  fio: string,
};
