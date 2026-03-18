import { useEffect, useState } from "react";

function BillDetails({ billId, go }) {
  const [bill, setBill] = useState(null);
  const [items, setItems] = useState([]);

  const fetchDetails = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/bills/${billId}`
      );
      const data = await res.json();

      setBill(data.bill);
      setItems(data.items);
    } catch (error) {
      console.error("Error fetching bill details:", error);
    }
  };

  useEffect(() => {
    if(billId){
        fetchDetails();
    }
  }, [billId]);

  if (!bill) return <p className="p-6">Loading...</p>;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Bill #{bill.id}
        </h2>

        <button
          onClick={() => go("history")}
          className="text-sm text-pink-600 font-semibold hover:underline"
        >
          ← Back
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        {new Date(bill.bill_date).toLocaleString()}
      </p>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-pink-50 text-pink-700">
            <th className="text-left px-3 py-2">Item</th>
            <th className="text-left px-3 py-2">Qty</th>
            <th className="text-left px-3 py-2">Price</th>
            <th className="text-left px-3 py-2">Amount</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="px-3 py-2">{item.name}</td>
              <td className="px-3 py-2">
                {item.quantity} {item.unit}
              </td>
              <td className="px-3 py-2">₹{item.price}</td>
              <td className="px-3 py-2">
                ₹{(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right mt-4 font-bold text-lg text-green-700">
        Total: ₹{Number(bill.total_amount).toFixed(2)}
      </div>
    </div>
  );
}

export default BillDetails;