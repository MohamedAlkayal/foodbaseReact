interface item {
  name: string;
  price: number;
}

interface Restaurant {
  _id: string;
  name: string;
  menuImages?: string[];
  menuLink: string;
  phone: number;
  items?: item[];
  createdAt: Date;
  updatedAt: Date;
}

export default Restaurant;
