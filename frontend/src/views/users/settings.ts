import type { IColumn } from '@/entities/types/UI/table'

export const columnsSettings: IColumn[] = [
  { key: 'number', title: 'Номер', width: '120px' },
  { key: 'FIO', title: 'ФИО' },
  { key: 'role', title: 'Роль' },
  { key: 'state', title: 'Состояние' },
];

export const initialUser = {
  firstName: '',
  lastName: '',
  login: '',
  password: '',
};
