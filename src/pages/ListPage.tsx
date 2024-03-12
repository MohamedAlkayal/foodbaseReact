import List from "../types/List";
import { ax } from "../../axios.config";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import ListInfo from "../components/list/ListInfo";

import { MenuLayout } from "../components/list/MenuLayout";
import { OrdersLayout } from "../components/list/OrdersLayout";

export function ListPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const listIdParam = searchParams.get("id");

  const [listData, setListData] = useState<List | null>(null);
  const [isFetchingList, seIsFetchingList] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("menu");

  const getData = async () => {
    seIsFetchingList(true);
    const res = await ax.get(`/list/${listIdParam}`);
    setListData(res.data.data);
    seIsFetchingList(false);
  };

  const updateList = async () => {
    await getData();
  };

  useEffect(() => {
    getData();
  }, []);

  const isOrderPending = listData?.state === "Pending";

  return (
    <div className="flex flex-col gap-6 lg:flex-row w-full p-4 pt-32 md:pt-32 md:p-12">
      <div className="flex flex-col justify-between p-8 border rounded-lg bg-gray-50 w-full lg:w-2/4">
        {isFetchingList ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner size=" h-24 w-24 " />
          </div>
        ) : (
          <ListInfo listData={listData} updateList={updateList} />
        )}
      </div>
      <div className="flex flex-col justify-between p-6 border rounded-lg bg-gray-50 w-full h-[750px]">
        <div className="w-full flex justify-around items-center pb-8 border-b">
          <p onClick={() => setSelectedTab("menu")} className={` cursor-pointer text-lg font-semibold ${selectedTab === "menu" ? " text-blue-700 " : " "} duration-300 hover:text-blue-500`}>
            Menu
          </p>
          <p onClick={() => setSelectedTab("hehe")} className={` cursor-pointer text-lg font-semibold ${!(selectedTab === "menu") ? " text-blue-700 " : " "} duration-300 hover:text-blue-500`}>
            Orders
          </p>
        </div>
        {selectedTab === "menu" && isOrderPending ? <MenuLayout listData={listData} updateList={updateList} /> : <OrdersLayout listData={listData} updateList={updateList} />}
      </div>
    </div>
  );
}
