import { DBUser } from "../database/DBUser";

export interface GetUsersResponse {
  success: boolean;
  count: number;
  pagination: {
    [key: string]: {
      page: number;
      limit: number;
    };
  };
  data: DBUser[];
}
