import type { IColumn } from '@/entities/types/UI/table';

export const columnsSettings: IColumn[] = [
  { key: 'id', title: 'Номер', width: '120px' },
  { key: 'title', title: 'Название', width: '240px' },
  { key: 'state', title: 'Состояние', width: '120px' },
  { key: 'description', title: 'Описание' },
];

export const initialBranch = {
  title: '',
  description: '',
};
