
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/format';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-serif font-medium">{product.name}</h3>
          <p className="text-sm text-tea-medium mt-1 line-clamp-1">{product.description}</p>
          <p className="text-lg font-medium mt-2">{formatPrice(product.price)}</p>
        </Link>
        
        <Button 
          className="w-full mt-3 btn-hover-effect"
          onClick={() => addToCart(product)}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
