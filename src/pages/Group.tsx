import { Group } from "../types/Group";
import { ax } from "../../axios.config";
import useToggle from "../utils/useToggle";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GroupInfo from "../components/group/GroupInfo";
import { ListsLayout } from "../components/group/ListsLayout";
import ListsController from "../components/group/ListsController";
import CreateListModal from "../components/group/CreateListModal";

export default function GroupPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const groupKeyParam = searchParams.get("key");
  const [groupData, setGroupData] = useState<Group | null>(null);
  const [isFetchingGroup, seIsFetchingGroup] = useState<boolean>(false);
  const [isOpened, setIsOpened, elementRef] = useToggle(false);
  const getData = async () => {
    seIsFetchingGroup(true);
    const res = await ax.get(`/group/${groupKeyParam}`);
    setGroupData(res.data.data);
    seIsFetchingGroup(false);
  };
  const updateGroupData = async () => {
    await getData();
  };
  useEffect(() => {
    getData();
  }, []);
  const toggle = () => {
    setIsOpened((t: boolean) => !t);
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full p-4 pt-32 md:pt-32 md:p-12">
        <GroupInfo isLoading={isFetchingGroup} groupData={groupData} updateGroupData={updateGroupData} />
        <div className="w-full lg:w-3/4 ">
          <ListsController groupData={groupData} toggle={toggle} />
          {groupData && <ListsLayout groupData={groupData} />}
        </div>
      </div>
      <CreateListModal isOpened={isOpened} elementRef={elementRef} toggle={toggle} groupData={groupData} updateGroupData={updateGroupData} />
    </>
  );
}
