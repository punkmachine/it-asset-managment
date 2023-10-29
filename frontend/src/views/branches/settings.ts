import type { IColumn } from '@/entities/types/UI/table';

export const columnsSettings: IColumn[] = [
  { key: 'id', title: 'id', width: '120px' },
  { key: 'title', title: 'Название' },
  { key: 'description', title: 'Описание' },
];

export const initialBranch = {
  title: '',
  description: '',
};
