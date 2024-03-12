import { Group } from "./Group";
import { MyUser } from "./MyUser";
import Restaurant from "./Restaurant";

interface List {
  _id: string;
  restaurant: Restaurant;
  menuImages?: string[];
  menuLink?: string;
  createdBy: MyUser;
  group: Group;
  orders: any[];
  state: "Pending" | "Ordered" | "Delivered";
  createdAt: Date;
  updatedAt: Date;
  ordersDue: Date;
}

export default List;
