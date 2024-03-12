import { Group } from "./Group";

export interface MyUser {
  _id?: string | undefined;
  username: string | undefined;
  email: string;
  groups: Group[];
  orders: string[];
  iat: number;
}
