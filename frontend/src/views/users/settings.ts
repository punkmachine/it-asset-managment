import type { IColumn } from '@/entities/types/UI/table'

export const columnsSettings: IColumn[] = [
  { key: 'id', title: 'id', width: '120px' },
  { key: 'FIO', title: 'ФИО' },
];

export const initialUser = {
  firstName: '',
  lastName: '',
  login: '',
  password: '',
};
