import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import copy from "copy-to-clipboard";
import { useState } from "react";
import { Group } from "../../types/Group";
import { useUser } from "../../context/UserContext";

interface ListsControllerProps {
  toggle: () => void;
  groupData: Group | null;
}

export default function ListsController({ toggle, groupData }: ListsControllerProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { user } = useUser();

  const copyToClipboard = () => {
    if (groupData?._id) {
      copy(groupData?._id);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="relative z-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
      <p className="text-2xl font-medium w-32 mb-4 md:mb-0 min-w-24 ">Lists</p>
      {groupData && (
        <div className="flex md:justify-end w-full gap-3 ">
          <form className="relative w-full flex justify-end">
            <>
              <input className="p-2 px-4 border w-full md:w-96 rounded-lg rounded-r-non bg-gray-100" id="key" value={groupData._id} type="text" disabled />
              <button onClick={copyToClipboard} type="button" className="py-2 w-16 rounded-lg rounded-l-none bg-gray-400 text-white duration-300 hover:bg-gray-500">
                {isCopied ? <DoneAllRoundedIcon /> : <ContentCopyRoundedIcon />}
              </button>
            </>
          </form>
          {(groupData.usersPermission.createOrderList || groupData.owner?._id == user?._id) && (
            <button onClick={toggle} className="py-2 w-36 rounded-lg bg-blue-600 text-white duration-300 hover:bg-blue-700">
              Add List
            </button>
          )}
        </div>
      )}
    </div>
  );
}
