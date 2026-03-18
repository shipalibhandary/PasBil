function Dashboard({ go }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h2>
      <p className="text-sm text-gray-500 mb-6">Choose what you want to do</p>

      <div className="grid grid-cols-1 sm:grid-cols-1 gap-8">
        <button
          onClick={() => go("add")}
          className="w-74 mx-auto px-64  py-9 rounded-xl border bg-pink-200 hover:bg-pink-300 text-left flex items-center justify-center"
        >
          <p className="text-lg font-semibold text-pink-700 ">Add Items</p>
        </button>

        <button
          onClick={() => go("billing")}
          className="w-74 mx-auto px-64  py-9 rounded-xl border bg-green-100 hover:bg-green-200 text-left flex items-center justify-center"
        >
          <p className="text-lg font-semibold text-green-700">Create Bill</p>
        </button>

        <button
          onClick={() => go("history")}
          className="w-74 mx-auto px-64  py-9 rounded-xl border bg-yellow-50 hover:bg-yellow-100 text-left flex items-center justify-center"
        >
          <p className="text-lg font-semibold text-yellow-700">View Bills History</p>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
