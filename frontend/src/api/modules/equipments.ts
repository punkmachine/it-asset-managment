import type { AxiosInstance } from 'axios';
import type { IQueryData } from '@/entities/types/backend/query';
import type {
  IEquipmentUpdatePayload,
  ICommentPayload,
  IHistoryPayload,
} from '@/entities/types/backend/payload/equipmentPayload';
import type { IEquipment, IHistoryItem } from '@/entities/types/backend/response/equipment';
import type { IPagination } from '@/entities/types/backend/response/pagination';
import { getQueryParams } from '@/utils/helpers/queryParam';

export const equipments = (client: AxiosInstance) => ({
  fetchEquipments: (): Promise<IPagination<IEquipment>> => {
    return client.get('/equipments');
  },
  getEquipmentById: (id: number | string): Promise<IEquipment> => {
    return client.get(`/equipment/${id}`);
  },
  searchEquipment: (data: IQueryData): Promise<IPagination<IEquipment>> => {
    return client.get(`equipments/search?${getQueryParams(data)}`);
  },
  createEquipments: (payload: FormData): Promise<IEquipment[]> => {
    return client.post('/equipments', payload);
  },
  updateEquipment: (id: number | string, payload: IEquipmentUpdatePayload): Promise<IEquipment> => {
    return client.put(`/equipment/${id}`, payload);
  },
  deleteEquipment: (id: number | string): Promise<IEquipment> => {
    return client.delete(`/equipment/${id}`);
  },
  commentEquipment: (equipmentId: number | string, payload: ICommentPayload): Promise<IEquipment> => {
    return client.post(`/equipment/comment/${equipmentId}`, payload);
  },
  getEquipmentsHistory: (equipmentId: number | string): Promise<IHistoryItem[]> => {
    return client.get(`/equipments/history/${equipmentId}`);
  },
  postEquipmentsHistory: (equipmentId: number | string, payload: IHistoryPayload): Promise<IHistoryItem> => {
    return client.post(`/equipments/history/${equipmentId}`, payload);
  },
});
