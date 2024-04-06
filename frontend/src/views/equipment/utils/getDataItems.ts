import type { IEquipment } from '@/entities/types/backend/response/equipment';
import { EquipmentState } from '@/entities/types/backend/response/equipment';
import { TimeFormatDict } from '@/utils/helpers/date';

import { getFormatDate } from '@/utils/helpers/date';

const generateDataItem = (title: string, value: string) => ({ title, value });

function getReadableState(state: EquipmentState) {
  const dict = {
    [EquipmentState.active]: 'Где-то лежит',
    [EquipmentState.deleted]: 'Списано',
    [EquipmentState.exploited]: 'Эксплуатируется',
    [EquipmentState.repaired]: 'Ремонтируется',
  };

  return dict[state];
}

function generateDataItems(equipment: IEquipment) {
  const format = TimeFormatDict.FullDateLongMonth;
  const FRP = equipment.financiallyResponsiblePerson;

  return [
    generateDataItem('Название устройства', equipment.name),
    generateDataItem('Инвентарный номер устройства:', equipment.inventoryNumber),
    generateDataItem('Серийный номер устройства:', equipment.serialNumber),
    generateDataItem('Статус устройства:', getReadableState(equipment.state)),
    generateDataItem('Ассет номер устройства:', equipment.assetNumber),
    generateDataItem('Материально-ответственное лицо:', `${FRP?.firstName || ''} ${FRP?.lastName || ''}`),
    generateDataItem('Получатель:', equipment.recipient || '-'),
    generateDataItem('Номер накладной:', equipment.invoiceNumber),
    generateDataItem('Филиал:', equipment.branch.title),
    generateDataItem('Описание устройства:', equipment.description),
    generateDataItem('Дата ввода в эксплуатацию:', getFormatDate(equipment.createdDate, format)),
    generateDataItem('Дата последнего изменения:', getFormatDate(equipment.updatedDate, format)),
  ];
}

export { generateDataItems };
