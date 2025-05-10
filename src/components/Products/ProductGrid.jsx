
import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, title }) => {
  return (
    <section className="py-12">
      {title && (
        <h2 className="section-heading text-center mx-auto">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
