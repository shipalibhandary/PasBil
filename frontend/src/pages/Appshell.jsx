import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import AddItems from "./AddItems";
import Billing from "./Billing";
import BillsHistory from "./BillsHistory";
import BillDetails from "./BillDetails";  

function AppShell() {
  const [page, setPage] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [selectedBillId, setSelectedBillId] = useState(null);

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
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-bold text-2xl text-gray-900 tracking-wide">Pastry Shop System</h1>
          
          {/* Home Button */}
          <button
            onClick={() => setPage("dashboard")}
            className="px-5 py-2 rounded-lg border border-pink-500 text-pink-600 font-semibold 
                 hover:bg-pink-500 hover:text-white transition duration-200"
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
            fetchProducts={fetchProducts}
            products={products}
          />
        )}

        {page === "billing" && (
          <Billing go={setPage} products={products} />
        )}
      </div>

      {page === "history" && (
        <BillsHistory 
          go={setPage}
          setSelectedBillId={setSelectedBillId}
        />
      )}

      {page== "billDetails" && (
        <BillDetails 
          billId={selectedBillId}
          go={setPage}
        />
      )}
    </div>
  );
}

export default AppShell;
