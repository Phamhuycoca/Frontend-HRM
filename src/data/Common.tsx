export interface refreshList {
  mode: "create" | "update" | "delete";
}
export interface typeModal {
  open: boolean;
  mode: "create" | "update" | "delete" | "view" | "close";
  record?: any;
}
export interface PaginationMeta {
  page: number;
  page_size: number;
  ranger: {
    from: number;
    to: number;
  };
  total: number;
  total_page: number;
}

export interface PagedResponse<T> {
  meta: PaginationMeta;
  data: T;
}
export interface ResponseData<T> {
  statusCode: number;
  data: T;
  success: boolean;
  message: string;
}
