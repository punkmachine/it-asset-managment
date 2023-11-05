import type { IColumn } from '@/entities/types/UI/table';

export const columnsSettings: IColumn[] = [
  { key: 'id', title: 'id', width: '100px' },
  { key: 'inventoryNumber', title: 'Инвентарный номер' },
  { key: 'serialNumber', title: 'Серийный номер' },
  { key: 'assetNumber', title: 'Ассет номер' },
  { key: 'name', title: 'Название' },
  { key: 'createdDate', title: 'Дата ввода' },
  { key: 'updatedDate', title: 'Дата изменения' },
  { key: 'financiallyResponsiblePerson', title: 'МОЛ' },
];

export const initialEquipment = {
  assetNumber: '',
  inventoryNumber: '',
  name: '',
  description: '',
  serialNumber: '',
  financiallyResponsiblePerson: '',
  recipient: '',
  invoiceNumber: '',
  branchId: '',
  comments: [],
};
