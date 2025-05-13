
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/format';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target;
              target.onerror = null;
              target.src = '/placeholder.svg';
            }}
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-tea-medium text-sm mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <div className="font-medium text-primary">{formatPrice(product.price)}</div>
            {product.stock === 0 ? (
              <span className="text-xs text-destructive">Hết hàng</span>
            ) : (
              <span className="text-xs text-green-600">Còn {product.stock}</span>
            )}
          </div>
        </div>
      </Link>
      
      <div className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full btn-hover-effect" 
          size="sm"
          disabled={product.stock === 0}
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          {product.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
