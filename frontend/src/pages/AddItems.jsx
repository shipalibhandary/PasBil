import { useState } from "react";

function AddItems({ go, products, setProducts }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("piece");

  const addProduct = (e) => {
    e.preventDefault();

    if (!name.trim() || !price) return;

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      price: Number(price),
      unit,
    };

    setProducts([newProduct, ...products]);
    setName("");
    setPrice("");
    setUnit("piece");
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Add Items</h2>
        <button
          onClick={() => go("billing")}
          className="text-sm font-semibold text-green-700 hover:underline"
        >
          Go to Billing →
        </button>
      </div>

      {/* Form */}
      <form onSubmit={addProduct} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-lg px-3 py-2 sm:col-span-2"
          placeholder="Item name (e.g., Chocolate Cake)"
        />

        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          className="border rounded-lg px-3 py-2"
          placeholder="Price"
        />

        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="piece">piece</option>
          <option value="kg">kg</option>
        </select>

        <button
          type="submit"
          className="sm:col-span-4 bg-pink-600 text-white rounded-lg py-2 font-semibold hover:bg-pink-700"
        >
          Add Item
        </button>
      </form>

      {/* List */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-2">Added Items</h3>

        {products.length === 0 ? (
          <p className="text-sm text-gray-500">No items added yet.</p>
        ) : (
          <div className="space-y-2">
            {products.map((p) => (
              <div key={p.id} className="border rounded-lg p-3 flex justify-between">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹{p.price} / {p.unit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => go("dashboard")}
        className="mt-6 text-sm text-gray-600 hover:underline"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}

export default AddItems;
