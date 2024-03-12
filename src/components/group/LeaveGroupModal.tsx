import { useState } from "react";
import { ax } from "../../../axios.config";
import { useUser } from "../../context/UserContext";
import { Group } from "../../types/Group";
import { useNavigate } from "react-router-dom";

interface LeaveGroupModalProps {
  isOpened: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
  toggle: () => void;
  group: Group | null;
  updateGroupData: () => void;
}

export function LeaveGroupModal({ isOpened, elementRef, toggle, group }: LeaveGroupModalProps) {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handelLeaveGroup = async () => {
    try {
      setIsSubmitting(true);
      await ax.post(`/group/leave/${group?._id}`);
      await updateUser();
      toggle();
      navigate(`/profile?user=${user?.username}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={isOpened ? "" : "hidden "}>
      <div className="top-0 left-0 z-40 absolute h-dvh w-full bg-black opacity-20"></div>
      <div ref={elementRef} className=" z-50 w-4/5 lg:w-1/3 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute bg-white p-8 pb-4 rounded-xl shadow-md">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-xl">Are you sure you want to leave {group?.name}?</p>
          {group?.members?.length === 1 && <p className="text-center text-red-500 text-lg">you're the last member by leaving all data will be lost</p>}
          <div className="w-full flex gap-2 mb-6 mt-8">
            <button disabled={isSubmitting} onClick={handelLeaveGroup} className={`p-2 w-full bg-red-500 text-white rounded-lg duration-300 hover:bg-red-600 ${isSubmitting ? " opacity-60 " : " "}`}>
              Leave Group
            </button>
            <button disabled={isSubmitting} onClick={toggle} className={`p-2 w-full bg-slate-300 rounded-lg duration-300 hover:bg-slate-400 ${isSubmitting ? " opacity-60 " : " "}`}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
