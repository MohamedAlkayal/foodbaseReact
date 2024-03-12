import { FormEvent, useEffect, useState } from "react";
import { ax } from "../../../axios.config";
import { Group } from "../../types/Group";
import Restaurant from "../../types/Restaurant";

interface CreateListModalProps {
  isOpened: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
  groupData: Group | null;
  toggle: () => void;
  updateGroupData: () => void;
}

export default function CreateListModal({ isOpened, elementRef, toggle, updateGroupData, groupData }: CreateListModalProps) {
  const [restaurants, setRestaurans] = useState<Restaurant[]>([]);
  const [ordersDue, setOrdersDue] = useState<string>("1");
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const newList = {
        group: groupData?._id,
        restaurant: selectedRestaurant,
        ordersDue: new Date(new Date().getTime() + 60 * 60 * 1000 * +ordersDue),
      };
      console.log(newList);
      await ax.post("/list", newList);
      await updateGroupData();
      toggle();
      setIsSubmitting(false);
    } catch (err) {
      console.log(err);
      setErrors("Somthing went wrong");
    }
  };

  useEffect(() => {
    const getRestaurants = async () => {
      const res = await ax.get("/restaurant");
      setRestaurans(res.data.data);
      setSelectedRestaurant(res.data.data[0]._id);
    };
    getRestaurants();
  }, []);

  return (
    <div className={`  ${isOpened ? "" : "hidden"}`}>
      <div className="top-0 absolute z-40 h-full w-full bg-black opacity-20"></div>
      <div ref={elementRef} className=" z-40 w-5/6 lg:w-1/3 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute bg-white p-8 pb-4 rounded-xl shadow-md">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="restaurant">Restaurant</label>
            <select id="restaurant" className={`border rounded focus:outline-blue-300 py-2 px-3`} onChange={(e) => setSelectedRestaurant(e.target.value)} value={selectedRestaurant}>
              {restaurants?.map((r) => {
                return (
                  <option key={r._id} value={r._id}>
                    {r.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <label className=" min-w-44" htmlFor="due">
              Order will be placed in
            </label>
            <input className="w-full border p-1 px-3 rounded focus:outline-blue-400" id="due" type="number" value={ordersDue} min={1} max={6} step={1} onChange={(e) => setOrdersDue(e.target.value)} />
            <p>Hours</p>
          </div>
          <button disabled={isSubmitting} type="submit" className={`w-full mb-3 bg-orange-500 text-white py-2 rounded duration-300 hover:bg-orange-600 ${isSubmitting ? " opacity-60" : ""}`}>
            Add List
          </button>
          <p className="text-center text-red-500 text-sm h-6">{errors}</p>
        </form>
      </div>
    </div>
  );
}
