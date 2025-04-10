// src/pages/Shop.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getCostumes } from '../services/costumeService';
import { getCategories } from '../services/categoryService';
import { useCustomer } from '../hooks/useCustomer';

function Shop() {
  const [costumes, setCostumes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const customerId = useCustomer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [costumeData, categoryData] = await Promise.all([
          getCostumes(),
          getCategories(),
        ]);
        console.log('Costume Data:', costumeData);
        console.log('Category Data:', categoryData);
        setCostumes(costumeData.filter(c => c.available));
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredCostumes = costumes.filter((costume) =>
    costume.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryFilteredCostumes = selectedCategory
    ? filteredCostumes.filter(c => c.categoryID === selectedCategory)
    : filteredCostumes;

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-purple-500 mb-8">
        Tất cả sản phẩm
      </h2>

      {/* Tìm kiếm */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Tìm sản phẩm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded-lg border border-purple-300 w-full sm:w-1/2"
        />
      </div>

      {/* Lọc theo danh mục */}
      <div className="mb-6 flex justify-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 rounded-lg border border-purple-300"
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Hiển thị các sản phẩm */}
      {categoryFilteredCostumes.length === 0 ? (
        <p className="text-center text-gray-700">Không có sản phẩm nào trong danh mục này</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryFilteredCostumes.map((costume) => (
            <ProductCard key={costume._id} costume={costume} customerId={customerId} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;  