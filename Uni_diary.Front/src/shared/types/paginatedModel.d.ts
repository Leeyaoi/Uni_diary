declare module "PaginatedType";

type PaginatedType<Model> = {
  limit: number;
  pageNum: number;
  pageCount: number;
  total: number;
  items: Model[];
};

export default PaginatedType;
