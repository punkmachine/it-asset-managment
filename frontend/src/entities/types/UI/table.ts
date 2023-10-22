export interface IColumn {
  key: string,
  title: string,
  width?: string,
};

export interface IRow {
  key: string,
  title: string,
}

export type TRows = IRow[];
