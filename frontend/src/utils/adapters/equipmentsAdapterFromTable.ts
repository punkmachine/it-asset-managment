import type { IEquipmentInTable, ICell } from '@/entities/types/UI/table';
import type { IEquipment } from '@/entities/types/backend/response/equipment';

function equipmentsAdapterFromTable(equipments: IEquipment[]): IEquipmentInTable[] {
  return equipments.map(equipment => {
    return {
      id: equipment.id.toString(),
      inventoryNumber: equipment.inventoryNumber,
      serialNumber: equipment.serialNumber,
      assetNumber: equipment.assetNumber,
      name: equipment.name,
      createdDate: equipment.createdDate,
      updatedDate: equipment.updatedDate,
      financiallyResponsiblePerson: equipment.financiallyResponsiblePerson,
    }
  });
}

export function getTableRows(equipments: IEquipment[]) {
  const equipmentsTable = equipmentsAdapterFromTable(equipments);

  return equipmentsTable.map(equipment => {
    let result: ICell[] = [];

    for (let key in equipment) {
      result.push({
        key,
        title: equipment[key as keyof IEquipmentInTable],
      });
    }

    return result;
  });
}
