
import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { products } from '@/data/products';
import ProductGrid from '@/components/Products/ProductGrid';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    
    return matchesSearch && matchesCategory;
  });

  // Extract unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];

  return (
    <Layout>
      <div className="bg-tea-light py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center mb-8">Sản phẩm của chúng tôi</h1>
          
          <div className="max-w-3xl mx-auto mb-12">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full px-4 py-3 border border-tea-medium/30 rounded-md focus:outline-none focus:ring-1 focus:ring-tea-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full transition-colors ${
                  category === cat
                    ? 'bg-tea-medium text-white'
                    : 'bg-white text-tea-dark hover:bg-tea-medium/10'
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat === 'all' ? 'Tất cả' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-medium mb-4">Không tìm thấy sản phẩm</h3>
            <p className="text-tea-medium">Vui lòng thử lại với từ khóa khác.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
