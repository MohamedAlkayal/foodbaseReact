import List from "../../types/List";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function ListCard({ list }: { list: List }) {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  // console.log(list);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateRemainingTime() {
    const currentTime = new Date().getTime();
    const targetDateTime = new Date(list.ordersDue).getTime();
    const difference = targetDateTime - currentTime;
    if (difference <= 0) return { hours: 0, minutes: 0 };
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
  }

  return (
    <div className="p-6 min-w-80 min-h-80 border rounded-lg">
      <div className=" overflow-hidden rounded-xl mb-4">
        <img src="/assets/placeholder.jpg" alt="placeholder" />
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-lg">{list.restaurant.name}</p>
        {(remainingTime.hours !== 0 || remainingTime.minutes !== 0) && (
          <p className="p-1 px-2 rounded bg-gray-100">
            {remainingTime.hours}h {remainingTime.minutes}m
          </p>
        )}
      </div>
      <Link className="cursor-pointer w-full block text-center p-2 rounded-lg text-white bg-blue-500 duration-300 hover:bg-blue-600" to={`/list?id=${list._id}`}>
        View List
      </Link>
    </div>
  );
}
