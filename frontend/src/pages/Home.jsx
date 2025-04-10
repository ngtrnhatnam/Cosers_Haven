import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import ProductCard from "../components/ProductCard";
import { getCostumes } from "../services/costumeService";
import { useCustomer } from "../hooks/useCustomer";

function Home() {
  const [costumes, setCostumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const customerId = useCustomer();

  useEffect(() => {
    console.log("useEffect in Home is running");
    const fetchCostumes = async () => {
      try {
        console.log("Fetching costumes...");
        const data = await getCostumes();
        console.log("Costumes received:", data);
        setCostumes(data.filter((c) => c.available).slice(0, 4));
      } catch (error) {
        console.error("Error fetching costumes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCostumes();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Đang tải...</div>;
  }

  return (
    <div>
      <Helmet>
        <title>Trang chủ - Coser's Haven</title>
      </Helmet>

      <div className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 py-16 text-center">
        <h1 className="text-5xl font-bold text-pink-500 drop-shadow-md">
          Chào mừng đến với Coser's Haven!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Thuê đồ cosplay dễ thương, hóa thân thành nhân vật yêu thích ngay hôm
          nay!
        </p>
        <button className="mt-6 px-8 py-3 bg-purple-400 text-white rounded-full hover:bg-purple-500 transition duration-300">
          Khám phá ngay
        </button>
      </div>
      <div className="container mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-center text-pink-500 mb-8">
          Sản phẩm nổi bật
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {costumes.map((costume) => (
            <ProductCard
              key={costume._id}
              costume={costume}
              customerId={customerId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;