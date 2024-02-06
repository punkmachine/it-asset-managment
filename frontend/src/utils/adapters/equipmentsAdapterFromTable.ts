import type { IEquipmentInTable, ICell } from '@/entities/types/UI/table';
import type { IEquipment } from '@/entities/types/backend/response/equipment';
import { EquipmentState } from '@/entities/types/backend/response/equipment';
import { getFormatDate, TimeFormatDict } from '@/utils/helpers/date';

function getReadableState(key: EquipmentState | 'default') {
  const dict = {
    ACTIVE: 'Активен',
    DELETED: 'Заблокирован',
    default: '...'
  };

  return dict[key] ? dict[key] : dict.default;
}

function equipmentsAdapterFromTable(equipments: IEquipment[]): IEquipmentInTable[] {
  return equipments.map((equipment, index) => {
    const { financiallyResponsiblePerson, branch } = equipment;

    return {
      _id: equipment._id,
      number: `${index + 1}`,
      inventoryNumber: equipment.inventoryNumber,
      serialNumber: equipment.serialNumber,
      assetNumber: equipment.assetNumber,
      name: equipment.name,
      createdDate: getFormatDate(equipment.createdDate, TimeFormatDict.FullDateLongMonth),
      updatedDate: getFormatDate(equipment.updatedDate, TimeFormatDict.FullDateLongMonth),
      financiallyResponsiblePerson: `${financiallyResponsiblePerson.firstName} ${financiallyResponsiblePerson.lastName}`,
      state: getReadableState(equipment.state),
      branch: branch.title,
    }
  });
}

export function getTableRows(equipments: IEquipment[]) {
  const equipmentsTable = equipmentsAdapterFromTable(equipments);

  return equipmentsTable.map(equipment => {
    const result: ICell[] = [];

    for (const key in equipment) {
      result.push({
        key,
        title: equipment[key as keyof IEquipmentInTable],
      });
    }

    return result;
  });
}
