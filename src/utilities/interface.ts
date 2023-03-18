
export interface PaginationInterface {
  page: number;
  take: number;
  total: number;
}


export interface ResponseMediaInterface {
  attributes: {
    type: string;
    path: string;
    createdAt: Date;
    updatedAt: Date;
  };
  id: number;
}