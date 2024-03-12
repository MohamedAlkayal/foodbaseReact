import List from "../../types/List";

interface OrderInvoiceProps {
  listData: List | null;
}

export function OrderInvoice({ listData }: OrderInvoiceProps) {
  const calculateTotalPriceAndItemCount = (orders: any[]) => {
    let totalPrice = 0;
    const itemTotalPrices: Record<string, number> = {}; // Store total price for each item

    orders.forEach((order) => {
      order.items.forEach((item: any) => {
        const itemPrice = parseInt(item.Price);
        const itemTotalPrice = item.count * itemPrice;
        totalPrice += itemTotalPrice;
        itemTotalPrices[item.name] = (itemTotalPrices[item.name] || 0) + itemTotalPrice;
      });
    });

    return { totalPrice, itemTotalPrices };
  };

  const { totalPrice: totalOrderPrice, itemTotalPrices } = calculateTotalPriceAndItemCount(listData?.orders || []);

  return (
    <div className="p-4 bg-gray-100 mb-4 max-h-52 overflow-y-scroll ">
      <p className="flex justify-between pb-4 border-b mb-4 font-semibold">
        <span>Total Price</span>
        <span>{totalOrderPrice} LE</span>
      </p>
      <ul>
        {Object.entries(itemTotalPrices).map(([itemName, itemTotalPrice]) => (
          <li key={itemName} className="flex justify-between mb-2">
            <div className="flex gap-4">
              <span>{listData?.orders.reduce((acc, order) => acc + order.items.find((item: any) => item.name === itemName)?.count || 0, 0)}</span>
              <span>{itemName}</span>
            </div>
            <span>{itemTotalPrice}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
