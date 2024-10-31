export default class PaginatedDto {
  limit: number;
  pageNum: number;
  pageCount: number;
  total: number;
  items: any[];
}
