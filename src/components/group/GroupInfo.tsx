import Avatar from "boring-avatars";
import Spinner from "../shared/Spinner";
import { Group } from "../../types/Group";
import useToggle from "../../utils/useToggle";
import EditGroupModal from "./EditGroupModal";
import { useUser } from "../../context/UserContext";
import { LeaveGroupModal } from "./LeaveGroupModal";
import avatarConfig from "../../utils/avatar.config";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { EditGroupSettingsModal } from "./EditGroupSettingsModal";

interface GroupInfoProps {
  isLoading: boolean;
  groupData: Group | null;
  updateGroupData: () => void;
}

export default function GroupInfo({ isLoading, groupData, updateGroupData }: GroupInfoProps) {
  const { user } = useUser();
  const [isOpened, setIsOpened, elementRef] = useToggle(false);
  const [isLeaveOpened, setIsLeaveOpened, leaveRef] = useToggle(false);
  const [isSettingsOpened, setIsSettingsOpened, settingsRef] = useToggle(false);

  const toggle = () => {
    setIsOpened((t: boolean) => !t);
  };

  const leaveToggle = () => {
    setIsLeaveOpened((l) => !l);
  };

  const settingsToggle = () => {
    setIsSettingsOpened((s) => !s);
  };

  return (
    <>
      <div className="border rounded-2xl w-full lg:w-1/4 p-8 flex flex-col gap-4 items-center bg-gray-50 h-fit mb-6 mr-0 lg:mb-0 lg:mr-6">
        {isLoading ? (
          <Spinner size=" w-14 h-14 " color=" text-orange-500 " />
        ) : (
          <>
            <Avatar size={80} name={groupData?.name} variant={avatarConfig.groupVariant} colors={avatarConfig.colors} />
            <p className="text-xl font-medium">
              {groupData?.name}
              {groupData?.usersPermission.editInfo || groupData?.owner?._id == user?._id ? <EditNoteRoundedIcon onClick={toggle} className=" duration-300 cursor-pointer hover:text-blue-600" /> : ""}
            </p>
            <p className="p-2 w-full text-center rounded-md bg-gray-100 font-medium  overflow-hidden">{groupData?.description}</p>
            <div className="p-2 w-full bg-gray-100">
              <div className="flex gap-2 flex-wrap w-full">
                {groupData?.members?.map((m) => {
                  return (
                    <div key={m._id} className="flex gap-2 flex-1 items-center p-2 px-4 rounded bg-gray-200">
                      <Avatar size={30} name={m.username} variant={avatarConfig.variant} colors={avatarConfig.colors} />
                      <p>{m.username}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full flex gap-2">
              <button onClick={leaveToggle} className="p-2 w-full bg-red-500 text-white rounded-lg duration-300 hover:bg-red-600">
                Leave Group
              </button>
              {user?._id === groupData?.owner?._id && (
                <button onClick={settingsToggle} className="p-2 bg-slate-300 rounded-xl duration-300 hover:bg-slate-400">
                  <SettingsRoundedIcon />
                </button>
              )}
            </div>
          </>
        )}
      </div>
      {groupData && <EditGroupModal isOpened={isOpened} elementRef={elementRef} toggle={toggle} group={groupData} updateGroupData={updateGroupData} />}
      {groupData && <LeaveGroupModal isOpened={isLeaveOpened} elementRef={leaveRef} toggle={leaveToggle} group={groupData} updateGroupData={updateGroupData} />}
      {groupData && <EditGroupSettingsModal isOpened={isSettingsOpened} elementRef={settingsRef} toggle={settingsToggle} group={groupData} updateGroupData={updateGroupData} />}
    </>
  );
}
