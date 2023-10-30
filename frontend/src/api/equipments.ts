import type { IEquipment } from '@/entities/types/backend/equipment';
import type { INewEquipment } from '@/views/equipments/types';
import { EquipmentState } from '@/entities/types/backend/equipment';
import { BranchState } from '@/entities/types/backend/branches';

export function fetchEquipments(): Promise<IEquipment[]> {
  return new Promise((resolve, reject) => {
    resolve([
      {
        id: 1,
        createdDate: '2023-10-22T04:55:58.867Z',
        updatedDate: '2023-10-22T04:55:58.867Z',
        assetNumber: '12345678',
        inventoryNumber: '1',
        name: 'Монитор Dell',
        description: 'Просто монитор, чо прикопались то с дескрипшеном?',
        serialNumber: '87654321',
        financiallyResponsiblePerson: 'Петрухин Василий',
        recipient: 'Петрухин Василий',
        comments: [
          'Комментарий 1', 'Комментарий 2', 'Комментарий 3',
        ],
        invoiceNumber: '1234',
        branch: {
          id: 1,
          createdDate: '2023-10-22T04:55:58.867Z',
          updatedDate: '2023-10-22T04:55:58.867Z',
          title: 'Филиал в Алматы',
          description: 'Филиал в Алматы',
          state: BranchState.active
        },
        state: EquipmentState.active,
        history: [],
      },
      {
        id: 2,
        createdDate: '2023-10-22T04:55:58.867Z',
        updatedDate: '2023-10-22T04:55:58.867Z',
        assetNumber: '1234569',
        inventoryNumber: '2',
        name: 'Монитор Dell',
        description: 'Просто монитор, чо прикопались то с дескрипшеном?',
        serialNumber: '87654322',
        financiallyResponsiblePerson: 'Петрухин Василий',
        recipient: 'Петрухин Василий',
        comments: [
          'Комментарий 1', 'Комментарий 2', 'Комментарий 3',
        ],
        invoiceNumber: '1235',
        branch: {
          id: 1,
          createdDate: '2023-10-22T04:55:58.867Z',
          updatedDate: '2023-10-22T04:55:58.867Z',
          title: 'Филиал в Алматы',
          description: 'Филиал в Алматы',
          state: BranchState.active
        },
        state: EquipmentState.active,
        history: [],
      }
    ]);
  });
}

export function getEquipmentById(id: string | number): Promise<IEquipment> {
  return new Promise((resolve, reject) => {
    resolve({
      id: +id,
      createdDate: '2023-10-22T04:55:58.867Z',
      updatedDate: '2023-10-22T04:55:58.867Z',
      assetNumber: '12345678',
      inventoryNumber: '1',
      name: 'Монитор Dell',
      description: 'Просто монитор, чо прикопались то с дескрипшеном?',
      serialNumber: '87654321',
      financiallyResponsiblePerson: 'Петрухин Василий',
      recipient: 'Петрухин Василий',
      comments: [
        'Комментарий 1', 'Комментарий 2', 'Комментарий 3',
      ],
      invoiceNumber: '1234',
      branch: {
        id: 1,
        createdDate: '2023-10-22T04:55:58.867Z',
        updatedDate: '2023-10-22T04:55:58.867Z',
        title: 'Филиал в Алматы',
        description: 'Филиал в Алматы',
        state: BranchState.active
      },
      state: EquipmentState.active,
      history: [],
    });
  });
}

export function deleteEquipment(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    resolve(true);
  });
}

export function editEquipment(equipment: IEquipment): Promise<IEquipment> {
  return new Promise((resolve, reject) => {
    resolve(equipment);
  });
}

export function postEquipment(newEquipment: INewEquipment): Promise<IEquipment> {
  return new Promise((resolve, reject) => {
    resolve({
      ...newEquipment,
      id: 3,
      createdDate: '2023-10-22T04:55:58.867Z',
      updatedDate: '2023-10-22T04:55:58.867Z',
      state: EquipmentState.active,
      history: [],
      branch: {
        id: +newEquipment.branchId,
        createdDate: '2023-10-22T04:55:58.867Z',
        updatedDate: '2023-10-22T04:55:58.867Z',
        title: 'Филиал в Алматы',
        description: 'Филиал в Алматы',
        state: BranchState.active,
      }
    })
  });
}
