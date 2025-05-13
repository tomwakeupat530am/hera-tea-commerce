
import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatPrice } from '@/utils/format';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const { product, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex items-start space-x-4 py-4 border-b border-gray-200 last:border-0">
      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target;
              target.onerror = null;
              target.src = '/placeholder.svg';
            }}
          />
        </Link>
      </div>
      
      <div className="flex-1 min-w-0">
        <Link to={`/product/${product.id}`} className="text-base font-medium text-gray-900 hover:text-primary">
          {product.name}
        </Link>
        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        <p className="mt-1 text-sm text-gray-500">{formatPrice(product.price)}</p>
      </div>
      
      <div className="flex flex-col items-end space-y-2">
        <p className="text-base font-medium text-gray-900">
          {formatPrice(product.price * quantity)}
        </p>
        
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={decrementQuantity}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-3 py-1 text-sm">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
            disabled={quantity >= product.stock}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
