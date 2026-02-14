import { useMemo,useState } from "react";


function Billing({ go, products }) {
    

    const [billItems,setBillItems]=useState([]);
    const [savedBills, setSavedBills]=useState([]);
    const[message,setMessage]=useState("");
    
    const addToBill = (product) => {
    const existing = billItems.find((item) => item.id === product.id);

    if (existing) {
      setBillItems(
        billItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setBillItems([
        ...billItems,
        {
          ...product,
          quantity: product.unit === "kg" ? 0.5 : 1,
        },
      ]);
    }
  };

  const updateQuantity = (id, value) => {
    const safe=Number.isFinite(value)?value:0;
    setBillItems(
      billItems.map((item) =>
        item.id === id ? { ...item, quantity: value } : item
      )
    );
  };

  const removeItem = (id) =>  setBillItems(billItems.filter((item) => item.id !== id));
  const clearBill=()=>setBillItems([]);

  const totalAmount =useMemo(() => {
    return billItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
   }, [billItems]);
 
   // ✅ Save Bill (frontend only)
  const saveBill = () => {
    if (billItems.length === 0) {
      setMessage(" Add items before saving.");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    const newBill = {
      billId: Date.now(), // temporary bill id
      date: new Date().toLocaleString(),
      items: billItems,
      total: Number(totalAmount.toFixed(2)),
    };

    setSavedBills([newBill, ...savedBills]); // save latest on top
    setBillItems([]); // clear current bill
    setMessage("✅ Bill saved successfully!");

    setTimeout(() => setMessage(""), 2000);
  };


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Pastry Shop Billing</h1>
            <div className="grid grid-cols-3 gap-6">

                {/* ✅ Message */}
                {message && (
                  <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 font-medium">
                    {message}
                  </div>
                )}
                {/*  Product List */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="font-semibold text-lg mb-4">Products</h2>

                    <div className="space-y-3">
                        {products.map((product) => (
                            <div key={product.id} className="flex justify-between items-center border rounded-lg p-3">
                                <div>
                                    <h3 className="font-medium">{product.name}</h3>
                                    <p className="text-sm text-gray-500">Rs {product.price}</p>
                                </div>

                                <button onClick={() => addToBill(product)} className="bg-pink-500 text-white px-3 py-1 rounded-lg hover:bg-pink-600 tr">Add</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Current Bill */}
                <div className="bg-white rounded-lg shadow p-4 col-span-2 border-l-4 border-pink-300">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-lg text-pink-700">Current Bill</h2>

                    <button
                      onClick={clearBill}
                      className="text-sm text-gray-600 hover:text-gray-900">Clear</button>
                  </div>
                  {billItems.length === 0 ? (
                    <p className="text-sm text-gray-500"> No items added to bill </p>
                  ) : (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-pink-50 text-pink-700">
                          <th className="text-left py-2">Item</th>
                          <th className="text-left">Qty</th>
                          <th className="text-left">Price</th>
                          <th className="text-left">Amount</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {billItems.map((item) => (
                          <tr key={item.id} className="border-b">
                            <td className="py-2">{item.name}</td>

                            <td>
                              <input
                                type="number"
                                step={item.unit === "kg" ? "0.1" : "1"}
                                min={item.unit === "kg" ? "0.1" : "1"}
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(item.id, Number(e.target.value))
                                }
                                className="w-20 border rounded px-2 py-1"
                              />
                              <span className="ml-1 text-xs">{item.unit=="piece"?"pcs":"kg"}</span>
                            </td>

                            <td>₹{item.price}</td>

                            <td>
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </td>

                            <td>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 text-sm"> Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
            </table>
          )}

           {/* Total + Save Bill */}
          <div className="flex items-center justify-between mt-4 gap-4">
            <div className="p-3 bg-pink-100 rounded-lg font-bold text-lg text-pink-700">
              Total: ₹{totalAmount.toFixed(2)}
            </div>

            <button
              onClick={saveBill}
              className="bg-pink-500 text-white px-3 py-1 rounded-lg">Save Bill
            </button>
        </div>
        {/* Saved bill count (optional) */}
          <p className="text-xs text-gray-500 mt-3">
            Saved bills (session): {savedBills.length}
          </p>
      </div>
    </div>
  </div>
  );
}
export default Billing;