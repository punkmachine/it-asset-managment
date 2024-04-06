export interface IPaginationQuery {
  page?: number,
  limit?: number,
}

export interface ISearchQuery extends IPaginationQuery {
  searchText: string,
}
