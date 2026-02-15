function Dashboard({ go }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Dashboard</h2>
      <p className="text-sm text-gray-500 mb-6">Choose what you want to do</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => go("add")}
          className="p-6 rounded-xl border bg-pink-200 hover:bg-pink-300 text-left"
        >
          <p className="text-lg font-semibold text-pink-700">Add Items</p>
          <p className="text-sm text-gray-600 mt-1">
            Add pastries, cakes, price and unit
          </p>
        </button>

        <button
          onClick={() => go("billing")}
          className="p-6 rounded-xl border bg-green-100 hover:bg-green-200 text-left"
        >
          <p className="text-lg font-semibold text-green-700">Billing</p>
          <p className="text-sm text-gray-600 mt-1">
            Create bill using added items
          </p>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
