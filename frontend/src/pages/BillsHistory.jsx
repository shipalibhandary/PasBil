import { useEffect, useState } from "react";

function BillsHistory({ go,setSelectedBillId }) {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBills = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bills");
      const data = await res.json();
      setBills(data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Bills History</h2>
        <button
          onClick={() => go("dashboard")}
          className="text-sm text-pink-600 font-semibold hover:underline"
        >
          ← Back to Dashboard
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading bills...</p>
      ) : bills.length === 0 ? (
        <p className="text-gray-500">No bills found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-pink-50 text-pink-700">
                <th className="text-left px-4 py-3">Bill ID</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr key={bill.id} className="border-t hover:bg-gray-50 cursor-pointer" onClick={() => {
                  setSelectedBillId(bill.id);
                  go("billDetails");
                }}>
                  <td className="px-4 py-3">{bill.id}</td>
                  <td className="px-4 py-3">
                    {new Date(bill.bill_date).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-medium text-green-700">
                    ₹{Number(bill.total_amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BillsHistory;