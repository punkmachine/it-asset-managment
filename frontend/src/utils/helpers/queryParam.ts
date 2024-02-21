import type { IQueryData } from '@/entities/types/backend/query';

export function getQueryParams(data: IQueryData) {
  return Object.keys(data)
    .map(key => `${key}=${data[key]}`)
    .join('&');
}
