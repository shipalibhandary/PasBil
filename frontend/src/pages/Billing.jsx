import { useState } from "react";

function Billing() {
    const products=[
        {id:1,name:"Mini Donut",price:40,unit:"piece"},
        {id:2,name:"cream filled Donut",price:60,unit:"piece"},

        {id:3,name:"Cupcake",price:40,unit:"piece"},
        {id:4,name:"Vanilla Cupcake",price:50,unit:"piece"},
        {id:5,name:"Chocolate Cupcake",price:60,unit:"piece"},
        {id:6,name:"Oreo Cupcake",price:70,unit:"piece"},

        {id:7,name:"Strawberry Cake",price:450,unit:"kg"},
        {id:8,name:"Red Velvet Cake",price:500,unit:"kg"},
        {id:9,name:"Fruit overload cake",price:500,unit:"kg"},
        {id:10,name:"Chocolate Cake",price:450,unit:"kg"},
        {id:11,name:"Black Forest Cake",price:500,unit:"kg"},
        {id:12,name:"Butterscotch Cake",price:400,unit:"kg"},
        {id:13,name:"White Forest Cake",price:450,unit:"kg"},
    ];

    const [billItems,setBillItems]=useState([]);
    const [savedBills, setsavedBills]=useState([]);
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

  const totalAmount =useMemo(
    () => billItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [billItems]
  );
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
                {/* this is Product List */}
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

                {/* this is Bill Table */}
        <div className="bg-white rounded-lg shadow p-4 col-span-2 border-l-4 border-pink-300">
          <h2 className="font-semibold text-lg mb-4 text-pink-700">Current Bill</h2>

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
                      <span className="ml-1 text-xs">{item.unit}</span>
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

          {/* Total part*/}
          <div className="text-right mt-4 font-bold text-lg">
            Total: ₹{totalAmount.toFixed(2)}
          </div>
        </div>
      </div>
        </div>
    );
}
export default Billing;