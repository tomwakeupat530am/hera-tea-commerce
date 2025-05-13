
import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { products } from '@/data/products';
import ProductGrid from '@/components/Products/ProductGrid';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { formatPrice } from '@/utils/format';

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([500000]);
  
  // Extract unique categories
  const categories = [...new Set(products.map(product => product.category))];

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handlePriceChange = (values) => {
    setPriceRange(values);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([500000]);
    setSearchTerm('');
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.price <= priceRange[0];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <Layout>
      <div className="bg-tea-light py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center mb-8">Sản phẩm của chúng tôi</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Left sidebar */}
            <div className="w-full lg:w-1/4 bg-white p-6 rounded-md shadow-sm">
              {/* Search */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Tìm kiếm</h3>
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full px-4 py-3 border border-tea-medium/30 rounded-md focus:outline-none focus:ring-1 focus:ring-tea-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Danh mục</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={category} 
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <label htmlFor={category} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Giá (0 - {formatPrice(500000)})</h3>
                <Slider
                  defaultValue={[500000]}
                  max={500000}
                  step={10000}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  className="py-4"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span>0 VND</span>
                  <span>{formatPrice(priceRange[0])}</span>
                </div>
              </div>
              
              {/* Reset Filters */}
              <Button 
                onClick={resetFilters} 
                variant="outline" 
                className="w-full mt-4"
              >
                Xóa bộ lọc
              </Button>
            </div>
            
            {/* Product Grid */}
            <div className="w-full lg:w-3/4">
              {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <div className="text-center py-20 bg-white rounded-md shadow-sm">
                  <h3 className="text-2xl font-medium mb-4">Không tìm thấy sản phẩm</h3>
                  <p className="text-tea-medium">Vui lòng thử lại với bộ lọc khác.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;
