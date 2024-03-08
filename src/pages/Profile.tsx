import ErrorPage from "./ErrorPage";
import { MyUser } from "../types/MyUser";
import { ax } from "../../axios.config";
import useToggle from "../utils/useToggle";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuthenticatedUser from "../utils/useAuthUser";
import GroupCard from "../components/profile/GroupCard";
import ProfileInfo from "../components/profile/ProfileInfo";
import CreateGroupModal from "../components/profile/CreateGroupModal";
import GroupsController from "../components/profile/GroupsController";

export default function Profile() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userParam = searchParams.get("user");

  const [user, setUser] = useState<MyUser | null>(null);
  useAuthenticatedUser(setUser);
  const [isOpened, setIsOpened, elementRef] = useToggle(false);

  useEffect(() => {
    const getUserProfile = async () => {
      const userProfile = await ax.get("/profile");
      console.log(userProfile);
      setUser(userProfile.data.data);
    };
    getUserProfile();
  }, []);

  const toggle = () => {
    setIsOpened((t: boolean) => !t);
  };

  if (user?.username) {
    if (user?.username != userParam) {
      return <ErrorPage />;
    }
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 w-full  p-4 pt-32  md:pt-32  md:p-12">
        <ProfileInfo user={user} />
        <div className="w-full lg:w-3/4 ">
          <GroupsController toggle={toggle} />
          <div className="flex flex-col gap-4">
            {user?.groups?.map((g) => {
              return <GroupCard group={g} />;
            })}
          </div>
        </div>
      </div>
      <CreateGroupModal isOpened={isOpened} elementRef={elementRef} toggle={toggle} />
    </>
  );
}
