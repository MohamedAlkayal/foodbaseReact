import { useEffect, useState } from "react";
import { Group } from "../../types/Group";
import List from "../../types/List";
import { ListCard } from "./ListCard";

interface ListsLayoutProps {
  groupData: Group;
}

const sortListsByDate = (lists: List[]) => {
  return lists.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

const extractUniqueDays = (lists: List[]) => {
  const uniqueDays = new Set<string>();
  lists.forEach((list) => {
    uniqueDays.add(new Date(list.createdAt).toLocaleDateString());
  });
  return Array.from(uniqueDays).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
};

export function ListsLayout({ groupData }: ListsLayoutProps) {
  const [days, setDays] = useState<string[]>([]);
  const [listsSorted, setListsSorted] = useState<List[]>([]);

  useEffect(() => {
    if (!groupData) return;
    const sortedLists = sortListsByDate(groupData.orderLists || []);
    const uniqueDays = extractUniqueDays(sortedLists);
    setListsSorted(sortedLists);
    setDays(uniqueDays);
  }, [groupData]);

  return (
    <>
      {days.map((d: string) => {
        return (
          <div key={d} className="p-2 pb-6">
            <div className="flex items-center mb-6 gap-6">
              <div className="w-full border h-0"></div>
              <p className=" block text-end text-gray-500 ">{d}</p>
            </div>
            <div className="flex flex-wrap gap-4 pb-6  ">
              {listsSorted.map((l: List) => {
                return new Date(l.createdAt).toLocaleDateString() == d && <ListCard key={l._id} list={l} />;
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
