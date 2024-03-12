import Avatar from "boring-avatars";
import avatarConfig from "../../utils/avatar.config";
import List from "../../types/List";
import { useEffect, useState } from "react";

interface ListInfoProps {
  listData: List | null;
}

export default function ListInfo({ listData }: ListInfoProps) {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateRemainingTime() {
    if (!listData || !listData.ordersDue) {
      return { hours: 0, minutes: 0 };
    }
    const currentTime = new Date().getTime();
    const targetDateTime = new Date(listData.ordersDue).getTime();
    const difference = targetDateTime - currentTime;
    if (difference <= 0) {
      return { hours: 0, minutes: 0 };
    }
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-center overflow-hidden rounded-lg mb-6 max-h-[200px]">
          <img className="w-full " src="src/assets/placeholder.jpg" alt="placehoder" />
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold">{listData?.restaurant}</p>
          <a className="text-blue-500 duration-300 hover:text-blue-700" href={listData?.menuLink} target="_blank">
            Open Menu
          </a>
        </div>
        <div className="flex gap-4 mb-4 bg-gray-100 rounded-lg">
          <p className="p-2 px-6 w-full rounded-lg">
            <span>{listData?.state}</span>
          </p>
          <div className="p-2 px-6 rounded-lg w-36">
            {remainingTime.hours != 0 && remainingTime.minutes != 0 ? (
              <p>
                {remainingTime.hours}h {remainingTime.minutes}m
              </p>
            ) : (
              <p>past due</p>
            )}
          </div>
        </div>
        <p className="p-4 bg-gray-100 mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure eligendi, porro ipsam architecto recusandae distinctio consequatur vero exercitationem, dolore quibusdam maiores! Neque facere tenetur saepe sequi. Tenetur consequatur iusto possimus.</p>
        <div>
          <div className="flex items-center gap-3 mb-8">
            <p>List created by</p>
            <Avatar size={30} name={listData?.createdBy.username} variant={avatarConfig.variant} colors={avatarConfig.colors} />
            <p>{listData?.createdBy.username}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="w-full p-2 rounded-lg bg-blue-500 text-white duration-300 hover:bg-blue-600">Mark as ordered</button>
        <button className=" p-2 bg-red-500 rounded-lg text-white duration-300 w-24 hover:bg-red-600">Cancel</button>
      </div>
    </>
  );
}
