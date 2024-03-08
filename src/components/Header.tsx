import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { MyUser } from "../types/MyUser";
import Avatar from "boring-avatars";
import avatarConfig from "../utils/avatar.config";
import useAuthenticatedUser from "../utils/useAuthUser";
import useDropdownToggle from "../utils/useToggle";

export default function Header() {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState<MyUser | null>(null);
  useAuthenticatedUser(setUser);
  const [isToggled, setIsToggled, dropdownRef] = useDropdownToggle(false);

  const Logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/login");
  };

  const navProfile = () => {
    console.log(params);
    navigate(`/profile?user=${user?.username}`);
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
      {user ? (
        <div ref={dropdownRef} onClick={toggle} className="relative  flex items-center justify-between gap-3 bg-orange-600  min-w-48 py-2 px-4 rounded-xl cursor-pointer duration-300 hover:bg-orange-700">
          <div className="flex gap-3 items-center">
            <Avatar size={20} name={user.username} variant={avatarConfig.variant} colors={avatarConfig.colors} />
            <p>{user?.username}</p>
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
    </header>
  );
}
