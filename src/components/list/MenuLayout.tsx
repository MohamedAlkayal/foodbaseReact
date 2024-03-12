import List from "../../types/List";
import Avatar from "boring-avatars";
import { useEffect, useState } from "react";
import avatarConfig from "../../utils/avatar.config";
import { useUser } from "../../context/UserContext";
import { Item } from "../../types/Restaurant";
import { ax } from "../../../axios.config";

interface OrdersLayoutProps {
  listData: List | null;
  updateList: () => void;
}

export function MenuLayout({ listData, updateList }: OrdersLayoutProps) {
  const [myItems, setMyItems] = useState<Item[]>([]);
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (listData && listData.restaurant && listData.restaurant.items) {
      const items = listData.restaurant.items.map((item) => ({ ...item, count: 0 }));
      setMyItems(items);
    }
  }, [listData]);

  const handleAddItem = (name: string) => {
    const myItemsClone = [...myItems];
    const updatedItems = myItemsClone.map((item) => (item.name === name ? { ...item, count: item.count + 1 } : item));
    setMyItems(updatedItems);
  };
  const handleDeleteItem = (name: string) => {
    const myItemsClone = [...myItems];
    const updatedItems = myItemsClone.map((item) => (item.name === name && item.count > 0 ? { ...item, count: item.count - 1 } : item));
    setMyItems(updatedItems);
  };

  const handelCreateOrder = async () => {
    try {
      setIsSubmitting(true);
      const createdOrder = {
        user: user?._id,
        list: listData?._id,
        group: listData?.group?._id,
        items: myItems.filter((i) => i.count > 0),
      };
      await ax.post("order", createdOrder);
      updateList();
      setIsSubmitting(false);
    } catch (err) {
      console.log(err);
    }
  };

  function isUserAssociatedWithOrders(listData: List | null, currentUserId: string | undefined) {
    if (!listData || !listData.orders || listData.orders.length === 0) {
      return false;
    }
    for (const order of listData.orders) {
      if (order.user._id === currentUserId) {
        return true;
      }
    }
    return false;
  }

  const totalCount = myItems.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = myItems.reduce((acc, item) => acc + item.count * item.Price, 0);
  const isThisUserOrderd = isUserAssociatedWithOrders(listData, user?._id);

  return (
    <>
      <div className="h-full p-4 mb-6">
        {myItems &&
          myItems.map((i) => {
            return (
              <div key={i.name} className=" flex justify-between w-full border-b p-4">
                <div className="flex gap-8">
                  <p className="text-center">{i.Price} LE</p>
                  <p>{i.name}</p>
                </div>
                <div className="flex">
                  <button onClick={() => handleDeleteItem(i.name)} className="bg-slate-200 p-1 px-4 rounded rounded-r-none font-semibold">
                    -
                  </button>
                  <span className="p-2 px-4 border block w-12 text-center">{i.count}</span>
                  <button onClick={() => handleAddItem(i.name)} className="bg-slate-200 p-1 px-4 rounded rounded-l-none font-semibold">
                    +
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div className="h-16 flex bg-gray-50 gap-8 pt-8 pb-4 items-center justify-between">
        <div className="flex items-center gap-8 w-full">
          <Avatar size={60} variant={avatarConfig.variant} name={user?.username} colors={avatarConfig.colors} />

          {isThisUserOrderd ? (
            <div className="p-4 rounded-lg text-green-700 font-semibold bg-gray-100 w-full">You already orderd on this list</div>
          ) : (
            <div className="p-4 rounded-lg bg-gray-100 w-full">
              You will order <span className={totalCount > 0 ? "text-blue-600 font-bold" : ""}>{totalCount}</span> itmes with total of <span className={totalPrice > 0 ? "text-blue-600 font-bold" : ""}>{totalPrice}</span> LE
            </div>
          )}
        </div>
        {!isThisUserOrderd ? (
          <button disabled={isSubmitting} onClick={handelCreateOrder} className={` ${isSubmitting ? " opacity-60 " : " "} min-w-36 p-4 rounded-lg bg-blue-500 text-white duration-300 hover:bg-blue-600`}>
            Confirm Order
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
