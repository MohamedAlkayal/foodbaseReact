import { MyUser } from "./MyUser";

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
  orderList?: string[];
}
