import { useState } from "react";

function AddItems({ go, fetchProducts, products }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("piece");

  const addProduct = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price) return;

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          price: Number(price),
          unit,
        }),
      });

      if (!res.ok) {
        alert("Error saving product");
        return;
      }

      // Clear form
      setName("");
      setPrice("");
      setUnit("piece");

      // Refresh product list
      fetchProducts();
    } catch (err) {
      console.error("Error:", err);
    }
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
      <form onSubmit={addProduct} className="grid grid-cols-1 gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-lg px-3 py-2"
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
          className="bg-pink-600 text-white rounded-lg py-2 font-semibold hover:bg-pink-700"
        >
          Add Item
        </button>
      </form>

      {/* List */}
      <div className="mt-6 bg-pink-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Added Items</h3>

        {products.length === 0 ? (
          <p className="text-sm text-gray-500">No items added yet.</p>
        ) : (
          <div className="space-y-2">
            {products.map((p) => (
              <div
                key={p.id}
                className="border rounded-lg p-3 flex justify-between bg-white"
              >
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
        className="mt-6 text-sm text-gray-700 hover:underline"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}

export default AddItems;