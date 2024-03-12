export interface Item {
  name: string;
  Price: number;
  count: number;
}

interface Restaurant {
  _id: string;
  name: string;
  menuImages?: string[];
  menuLink: string;
  phone: number;
  items?: Item[];
  createdAt: Date;
  updatedAt: Date;
}

export default Restaurant;
