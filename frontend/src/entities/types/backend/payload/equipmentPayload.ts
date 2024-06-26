import { EquipmentState } from '@/entities/types/backend/response/equipment';

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
  passedOn: string; // id админа
  accepted: string;
  branch: string;
  invoiceNumber: string;
  equipmentState: EquipmentState;
}

export interface ICommentPayload {
  text: string;
}
