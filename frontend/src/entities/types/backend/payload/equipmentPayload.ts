import { EquipmentState } from '@/entities/types/backend/response/equipment';

export interface IEquipmentCreatePayload {
  assetNumber: string; // ассет номер
  inventoryNumber: string; // инвентарный номер
  name: string; // название
  description: string; // описание
  serialNumber: string; // серийный номер
  financiallyResponsiblePerson: string; // материально ответственное лицо
  recipient: string; // получатель
  invoiceNumber: string; // номер накладной
  branch: string; // id филиал
}

export interface IEquipmentUpdatePayload {
  assetNumber: string; // ассет номер
  inventoryNumber: string; // инвентарный номер
  name: string; // название
  description: string; // описание
  serialNumber: string; // серийный номер
  financiallyResponsiblePerson: string; // материально ответственное лицо
  recipient: string; // получатель
  invoiceNumber: string; // номер накладной
  branch: string; // id филиал
  state: EquipmentState;
}

export interface IHistoryPayload {
  passedOn: string; // id пользователя
  accepted: string;
}

export interface ICommentPayload {
  text: string;
}
