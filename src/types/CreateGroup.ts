export interface CreateGroup {
  name: string;
  description: string;
  usersPermission: {
    editName: boolean;
    editDescription: boolean;
    createOrderList: boolean;
  };
}
