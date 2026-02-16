import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import AddItems from "./AddItems";
import Billing from "./Billing";

function AppShell() {
  const [page, setPage] = useState("dashboard");

  const [products, setProducts] = useState([]);
  const fetchProducts=async()=>{
    
    try{
      const res=await fetch("http://localhost:5000/api/products");
      const data=await res.json();
      setProducts(data);
    }catch(err){
      console.error("Error fetching products",err);
    }
  };


  useEffect(() => {
    fetchProducts();
  },[]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top bar */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-bold text-lg text-gray-800">Pastry Shop System</h1>
          <button
            onClick={() => setPage("dashboard")}
            className="text-sm text-pink-600 font-semibold hover:underline"
          >
            Home
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4">
        {page === "dashboard" && <Dashboard go={setPage} />}

        {page === "add" && (
          <AddItems
            go={setPage}
            products={products}
            setProducts={setProducts}
          />
        )}

        {page === "billing" && (
          <Billing go={setPage} products={products} />
        )}
      </div>
    </div>
  );
}

export default AppShell;
