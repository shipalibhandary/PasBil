function Login(){
    return (
        <div className="min-h-screen flex items-center justify-center bg-grey-100">
            <div className="w-full max-w-md bg-pink-100 rounded-xl shadow-lg p-8">

                <h2 className="text-2xl font-bold text-center text-grey-800 mb-6">Pastry Login</h2>

            <form className="space-y-5 box-shadow-pink">
                <div>
                    <label className="block text-1xl font-medium text gray-800">Username</label>
                    <input type="text" placeholder="Enter username" className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "/>
                </div>

                <div>
                    <label className="block text-1xl font-medium text gray-800">Password</label>
                    <input type="text" placeholder="Enter password" className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "/>
                </div>
                
                <button type="button" className="w-full bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition">Login</button>
            </form>

            <p className="text-xs text-center text-gray-500 mt-4">
          © 2026 Pastry Shop Billing System
        </p>
            </div>
        </div>

    );
}

export default Login;