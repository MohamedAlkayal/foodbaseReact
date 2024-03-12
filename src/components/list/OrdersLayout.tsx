import Avatar from "boring-avatars";
import List from "../../types/List";
import avatarConfig from "../../utils/avatar.config";

interface OrdersLayoutProps {
  listData: List | null;
  updateList: () => void;
}

export function OrdersLayout({ listData, updateList }: OrdersLayoutProps) {
  const calculateOrderTotal = (order: any) => {
    let totalPrice = 0;
    let totalCount = 0;
    order.items.forEach((item: any) => {
      totalPrice += item.count * parseInt(item.Price);
      totalCount += item.count;
    });
    return { totalPrice, totalCount };
  };

  return (
    <>
      <div className="h-full p-4 mb-6 overflow-y-scroll">
        {listData?.orders.map((o) => {
          const { totalPrice, totalCount } = calculateOrderTotal(o);
          return (
            <div key={o._id} className="p-6 mb-6 border rounded-2xl bg-white">
              <div className="flex gap-4 items-center mb-4">
                <Avatar name={o.user.username} variant={avatarConfig.variant} colors={avatarConfig.colors} />
                <p className="text-lg  font-semibold mr-4">{o.user.username}</p>
                <p>{`ordered ${totalCount} items with total of ${totalPrice} LE`}</p>
              </div>
              <div>
                {o.items.map((i: any) => {
                  return (
                    <div className="p-3 border-b flex justify-between last:border-none" key={i.name}>
                      <div>
                        <span>{i.count}x</span>
                        <span> {i.name}</span>
                      </div>
                      <span>{i.Price} LE</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
