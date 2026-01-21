function Billing() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Pastry Shop Billing</h1>
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="font-semibold mb-4">Products</h2>
                    <p className="text-sm text-gray-500">Product list will appear here</p>
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