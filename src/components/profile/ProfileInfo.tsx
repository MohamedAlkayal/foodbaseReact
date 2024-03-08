import Avatar from "boring-avatars";
import { MyUser } from "../../types/MyUser";
import avatarConfig from "../../utils/avatar.config";

interface ProfileInfoProps {
  user: MyUser | null;
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  return (
    <div className="  border rounded-2xl w-full lg:w-1/4 p-8 flex flex-col gap-4 items-center bg-gray-50 h-fit">
      <Avatar size={80} name={user?.username} variant={avatarConfig.variant} colors={avatarConfig.colors} />
      <p className="text-xl font-medium">{user?.username}</p>
      <p className="p-2 w-full text-center rounded-md bg-gray-100 font-medium  overflow-hidden">{user?.email}</p>
      <div className="flex w-full gap-2">
        <p className="p-2 w-full text-center rounded-md bg-gray-100 font-medium">{user?.groups?.length} Groups</p>
        <p className="p-2 w-full text-center rounded-md bg-gray-100 font-medium ">{user?.orders?.length} Order</p>
      </div>
      <button className="w-full bg-gray-300 py-2 px-6 rounded cursor-pointer duration-300 hover:bg-gray-400">Edit Info</button>
    </div>
  );
}
