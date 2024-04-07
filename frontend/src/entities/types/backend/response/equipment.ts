import type { IBranch } from './branches';
import type { IAdmin } from './admins';

export enum EquipmentState {
  active = 'ACTIVE',
  deleted = 'DELETED',
  exploited = 'EXPLOITED',
  repaired = 'BEING_REPAIRED',
}

export interface IHistoryItem {
  _id: string;
  date: string; // когда была передана
  passedOn: IAdmin; // передал
  accepted: string; // принял
  branch: IBranch;
  equipmentId: string;
  equipmentState: EquipmentState;
  invoiceNumber: string;
}

export interface IEquipment {
  _id: string;
  createdDate: string; // дата ввода в эксплуатацию
  updatedDate: string; // дата последнего изменения

  assetNumber: string; // ассет номер
  inventoryNumber: string; // инвентарный номер
  name: string; // название
  description: string; // описание
  serialNumber: string; // серийный номер
  financiallyResponsiblePerson: IAdmin; // материально ответственное лицо
  recipient: string; // получатель
  comments: string[]; // комментарии
  invoiceNumber: string; // номер накладной
  branch: IBranch; // филиал
  state: EquipmentState; // статус оборудования

  history: IHistoryItem[];
}
