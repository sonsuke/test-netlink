export interface User {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  isActive: boolean;
}

export interface FindResult<T> {
  data: T[];
  page?: number;
  count?: number;
  limit?: number;
}
