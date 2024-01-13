import type { IBranch } from './branches';
import type { IUser } from './user';

export enum EquipmentState {
  active = 'ACTIVE',
  deleted = 'DELETED',
};

export interface IHistoryItem {
  id: number,
  date: string, // когда была передана
  passedOn: IUser, // передал
  accepted: string, // принял
};

export interface IEquipment {
  id: number,
  createdDate: string, // дата ввода в эксплуатацию
  updatedDate: string, // дата последнего изменения

  assetNumber: string, // ассет номер
  inventoryNumber: string, // инвентарный номер
  name: string, // название
  description: string, // описание
  serialNumber: string, // серийный номер
  financiallyResponsiblePerson: string, // материально ответственное лицо
  recipient: string, // получатель
  comments: string[] // комментарии
  invoiceNumber: string, // номер накладной
  branch: IBranch, // филиал
  state: EquipmentState, // статус оборудования

  history: IHistoryItem[],
};
