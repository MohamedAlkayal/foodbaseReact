import useToggle from "../utils/useToggle";
import { useUser } from "../context/UserContext";
import GroupCard from "../components/profile/GroupCard";
import ProfileInfo from "../components/profile/ProfileInfo";
import CreateGroupModal from "../components/profile/CreateGroupModal";
import GroupsController from "../components/profile/GroupsController";

export default function Profile() {
  const [isOpened, setIsOpened, elementRef] = useToggle(false);
  const { user, isFetchingUser } = useUser();

  const toggle = () => {
    setIsOpened((t: boolean) => !t);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full p-4 pt-32 md:pt-32 md:p-12">
        <ProfileInfo isLoading={isFetchingUser} user={user} />
        <div className="w-full lg:w-3/4 ">
          <GroupsController toggle={toggle} />
          <div className="flex flex-col gap-4">
            {user?.groups?.map((g) => {
              return <GroupCard key={g._id} group={g} />;
            })}
          </div>
        </div>
      </div>
      <CreateGroupModal isOpened={isOpened} elementRef={elementRef} toggle={toggle} />
    </>
  );
}
