import { MyUser } from "./MyUser";
import List from "./List";

export interface Group {
  _id?: string;
  name: string;
  description: string;
  members?: MyUser[];
  owner?: MyUser;
  usersPermission: {
    editInfo: boolean;
    createOrderList: boolean;
    _id?: string;
  };
  orderLists?: List[];
}
