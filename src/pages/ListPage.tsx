import List from "../types/List";
import { ax } from "../../axios.config";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import ListInfo from "../components/list/ListInfo";

import { OrdersLayout } from "../components/list/OrdersLayout";

export function ListPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const listIdParam = searchParams.get("id");

  const [listData, setListData] = useState<List | null>(null);
  const [isFetchingList, seIsFetchingList] = useState<boolean>(false);

  const getData = async () => {
    seIsFetchingList(true);
    const res = await ax.get(`/list/${listIdParam}`);
    setListData(res.data.data);
    seIsFetchingList(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col gap-6 lg:flex-row w-full p-4 pt-32 md:pt-32 md:p-12">
      <div className="flex flex-col justify-between p-8 border rounded-lg bg-gray-50 w-full lg:w-2/4">
        {isFetchingList ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner size=" h-24 w-24 " />
          </div>
        ) : (
          <ListInfo listData={listData} />
        )}
      </div>
      <div className="flex flex-col justify-between p-8 border rounded-lg bg-gray-50 w-full h-[750px]">
        <OrdersLayout />
      </div>
    </div>
  );
}
