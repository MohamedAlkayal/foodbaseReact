import Avatar from "boring-avatars";
import avatarConfig from "../../utils/avatar.config";
import List from "../../types/List";
import { useEffect, useState } from "react";
import { ax } from "../../../axios.config";
import { useNavigate } from "react-router-dom";
import { OrderInvoice } from "./OrderInvoice";

interface ListInfoProps {
  listData: List | null;
  updateList: () => void;
}

export default function ListInfo({ listData, updateList }: ListInfoProps) {
  const navigate = useNavigate();

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  const cancelOrder = async () => {
    try {
      setIsSubmitting(true);
      await ax.delete(`/list/${listData?._id}`);
      updateList();
      navigate(`/group?key=${listData?.group._id}`);
      setIsSubmitting(false);
    } catch (err) {
      console.log(err);
    }
  };

  const markAsOrdered = async () => {
    try {
      setIsSubmitting(true);
      await ax.patch(`/list/${listData?._id}`, { state: "Ordered" });
      updateList();
      setIsSubmitting(false);
    } catch (err) {
      console.log(err);
    }
  };

  const markAsPending = async () => {
    try {
      setIsSubmitting(true);

      await ax.patch(`/list/${listData?._id}`, { state: "Pending" });
      updateList();
      setIsSubmitting(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-center overflow-hidden rounded-lg mb-6 max-h-[200px]">
          <img className="w-full " src="/assets/placeholder.jpg" alt="placehoder" />
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold">{listData?.restaurant.name}</p>
          <a className="text-blue-500 duration-300 hover:text-blue-700" href={listData?.restaurant.menuLink} target="_blank">
            Open Menu
          </a>
        </div>
        <div className="flex gap-4 mb-4 bg-gray-100 rounded-lg">
          <p className="p-2 px-6 w-full rounded-lg">
            <span className={listData?.state === "Pending" ? "text-green-700" : listData?.state === "Ordered" ? "text-blue-600" : ""}>{listData?.state}</span>
          </p>
          <div className="p-2 px-6 rounded-lg w-36">
            {remainingTime.hours != 0 || remainingTime.minutes != 0 ? (
              <p>
                {remainingTime.hours}h {remainingTime.minutes}m
              </p>
            ) : (
              <p>past due</p>
            )}
          </div>
        </div>
        {listData?.orders.length > 0 ? <OrderInvoice listData={listData} /> : <p className="p-4 bg-gray-100 mb-4"> There is no orders yet</p>}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <p>List created by</p>
            <Avatar size={30} name={listData?.createdBy.username} variant={avatarConfig.variant} colors={avatarConfig.colors} />
            <p>{listData?.createdBy.username}</p>
          </div>
        </div>
      </div>

      {listData?.state == "Pending" ? (
        <div className="flex gap-2">
          <button onClick={markAsOrdered} className={` w-full p-2 rounded-lg bg-blue-500 text-white duration-300 hover:bg-blue-600 ${isSubmitting ? " opacity-60 " : " "} `}>
            Mark as ordered
          </button>
          <button onClick={cancelOrder} className={` p-2 bg-red-500 rounded-lg text-white duration-300 w-24 hover:bg-red-600  ${isSubmitting ? " opacity-60 " : " "} `}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button onClick={markAsPending} className={` w-full p-2 rounded-lg bg-slate-500 text-white duration-300 hover:bg-blue-600 ${isSubmitting ? " opacity-60 " : " "} `}>
            Mark as pending
          </button>
          <button onClick={cancelOrder} className={` p-2 bg-red-500 rounded-lg text-white duration-300 w-24 hover:bg-red-600 ${isSubmitting ? " opacity-60 " : " "} `}>
            Cancel
          </button>
        </div>
      )}
    </>
  );
}
