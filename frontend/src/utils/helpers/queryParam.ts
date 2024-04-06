import type { IPaginationQuery, ISearchQuery } from '@/entities/types/backend/payload/query';

export function getQueryParams<T extends IPaginationQuery | ISearchQuery>(data: T): string {
  return Object.keys(data)
    .map(key => `${key}=${data[key]}`)
    .join('&');
}
