import Avatar from "boring-avatars";
import { MyUser } from "../../types/MyUser";
import avatarConfig from "../../utils/avatar.config";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import useToggle from "../../utils/useToggle";
import EditUserModal from "./EditUserModal";
import Spinner from "../shared/Spinner";

interface ProfileInfoProps {
  user: MyUser | null;
  isLoading: boolean;
}

export default function ProfileInfo({ user, isLoading }: ProfileInfoProps) {
  const [isOpened, setIsOpened, elementRef] = useToggle(false);

  const toggle = () => {
    setIsOpened((t: boolean) => !t);
  };

  return (
    <>
      <div className="border rounded-2xl w-full lg:w-1/4 p-8 flex flex-col gap-4 items-center bg-gray-50 h-fit mb-6 mr-0 lg:mb-0 lg:mr-6">
        {isLoading ? (
          <Spinner size=" w-14 h-14 " color=" text-orange-500 " />
        ) : (
          <>
            <Avatar size={80} name={user?.username} variant={avatarConfig.variant} colors={avatarConfig.colors} />
            <p className="text-xl font-medium">
              {user?.username} <EditNoteRoundedIcon onClick={toggle} className=" duration-300 cursor-pointer hover:text-blue-600" />
            </p>
            <p className="p-2 w-full text-center rounded-md bg-gray-100 font-medium  overflow-hidden">{user?.email}</p>
            <div className="flex w-full gap-2">
              <p className="p-2 w-full text-center rounded-md bg-gray-100 font-medium">{user?.groups?.length} Groups</p>
              <p className="p-2 w-full text-center rounded-md bg-gray-100 font-medium ">{user?.orders?.length} Order</p>
            </div>
            <p className="p-2 w-full text-center lg:text-start text-sm rounded-md bg-gray-100 font-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto itaque possimus.</p>
          </>
        )}
      </div>
      {user && <EditUserModal isOpened={isOpened} elementRef={elementRef} toggle={toggle} />}
    </>
  );
}
