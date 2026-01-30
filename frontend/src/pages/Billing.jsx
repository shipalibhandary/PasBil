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

    const [billItems,setBillitems]=useState([]);

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
    setBillItems(
      billItems.map((item) =>
        item.id === id ? { ...item, quantity: value } : item
      )
    );
  };

  const removeItem = (id) => {
    setBillItems(billItems.filter((item) => item.id !== id));
  };

  const totalAmount = billItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Pastry Shop Billing</h1>
            <div className="grid grid-cols-3 gap-6">

                {/* Product List */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="font-semibold text-lg mb-4">Products</h2>

                    <div className="space-y-3">
                        {products.map((product) => (
                            <div key={product.id} className="flex justify-between items-center border rounded-lg p-3">
                                <div>
                                    <h3 className="font-medium">{product.name}</h3>
                                    <p className="text-sm text-gray-500">Rs {product.price}</p>
                                </div>

                                <button className="bg-pink-500 text-white px-3 py-1 rounded-lg hover:bg-pink-600 tr">Add</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4 col-span-2">
                    <h2 className="font-semibold mb-4">Current Bill</h2>
                    <p className="text-sm text-gray-500">selected items will appear here</p>
                </div>
            </div>
        </div>
    );
}
export default Billing;