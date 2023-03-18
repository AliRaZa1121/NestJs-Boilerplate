export interface SuccessApiInterface {
  message?: string;
  data: any;
  statusCode: number;
  totalCount?: number;
  currentPage?: number;
  nextPage?: number;
  prevPage?: number;
  lastPage?: number;
}

export interface ErrorApiInterface {
  error: string;
  statusCode: number;
}
