import Avatar from "boring-avatars";
import avatarConfig from "../../utils/avatar.config";
import { useUser } from "../../context/UserContext";
// import { useState } from "react";

export function OrdersLayout() {
  const { user } = useUser();
  //   const [letters, setLetters] = useState<number>(0);
  //   const [orderText, setOrderText] = useState<string>("");

  return (
    <>
      <div className="h-full overflow-y-scroll p-4 mb-6"></div>
      <div className="flex gap-4">
        <Avatar size={60} variant={avatarConfig.variant} name={user?.username} colors={avatarConfig.colors} />
        <form className="w-full">
          <div className="relative">
            <textarea className="w-full px-4 p-3 h-24 border rounded-lg resize-none outline-blue-300" placeholder="Enter your order" />
            <p className=" absolute right-4 bottom-4 text-gray-400 text-sm">0 / 100</p>
          </div>
          <div className="w-full flex gap-2 items-center">
            <input className="w-full border rounded-lg p-2 px-4 outline-blue-300" placeholder="Enter payed amount" type="number" />
            <button className=" w-60 rounded-lg p-2 bg-blue-500 text-white duration-300 hover:bg-blue-600" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
