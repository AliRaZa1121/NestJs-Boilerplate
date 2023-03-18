export interface ResponseUserInterface {
  attributes: {
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    role?: Object;
  };
  id: number;
}
