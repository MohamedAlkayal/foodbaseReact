import Spinner from "./Spinner";
import Avatar from "boring-avatars";
import { useUser } from "../../context/UserContext";
import avatarConfig from "../../utils/avatar.config";
import { Link, useNavigate } from "react-router-dom";
import useDropdownToggle from "../../utils/useToggle";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

import { resetAxiosConfig } from "../../../axios.config";

export default function Header() {
  const navigate = useNavigate();
  const { user, isFetchingUser, updateUser } = useUser();
  const [isToggled, setIsToggled, dropdownRef] = useDropdownToggle(false);

  const Logout = async () => {
    localStorage.removeItem("accessToken");
    await updateUser();
    resetAxiosConfig();
    navigate("/login");
  };

  const navProfile = () => {
    navigate(`/profile`);
  };

  const navHome = () => {
    navigate("/");
  };

  const toggle = () => {
    setIsToggled((t: boolean) => !t);
  };

  return (
    <header className="flex fixed z-40 w-full justify-between items-center py-4 px-4 bg-orange-500 text-white shadow-lg md:px-16">
      <p onClick={navHome} className="modak cursor-pointer text-xl ">
        Foodbase
      </p>
      {isFetchingUser ? (
        <div className="bg-orange-600 flex justify-center text-white py-2 px-6 rounded-xl cursor-pointer duration-300 hover:bg-orange-700 min-w-48">
          <Spinner />
        </div>
      ) : (
        <>
          {user ? (
            <div ref={dropdownRef} onClick={toggle} className="relative flex items-center justify-between gap-3 bg-orange-600  min-w-48 py-2 px-4 rounded-xl cursor-pointer duration-300 hover:bg-orange-700">
              <div className="flex gap-3 items-center">
                <Avatar size={20} name={user.username} variant={avatarConfig.variant} colors={avatarConfig.colors} />
                <p>{user.username}</p>
              </div>
              <ArrowDropDownRoundedIcon className={` ${isToggled ? " rotate-180" : ""}`} />
              <ul className={`absolute  w-full bg-white shadow-xl border rounded-xl text-black p-2 w-50 left-0 top-11 ${isToggled ? "" : "hidden"}`}>
                <li onClick={navProfile} className="flex items-center gap-3 p-3 border-b rounded duration-300 hover:bg-gray-100">
                  <PermIdentityOutlinedIcon fontSize="small" className="text-gray-600" />
                  Profile
                </li>
                <li onClick={Logout} className=" flex items-center gap-3 p-3  rounded duration-300 hover:bg-gray-100">
                  <ExitToAppOutlinedIcon fontSize="small" className="text-gray-600" /> Logout
                </li>
              </ul>
            </div>
          ) : (
            <Link to={"/login"} className="bg-orange-600 text-white py-2 px-6 rounded-xl cursor-pointer duration-300 hover:bg-orange-700">
              Login
            </Link>
          )}
        </>
      )}
    </header>
  );
}
