
import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/format';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const incrementQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <div className="flex border-b border-gray-200 pb-4">
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium text-sm">{product.name}</h3>
          <button 
            onClick={() => removeFromCart(product.id)}
            className="text-gray-500 hover:text-destructive transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        
        <p className="text-tea-medium text-sm mt-1">{formatPrice(product.price)}</p>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={decrementQuantity}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              disabled={quantity === 1}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="px-2 py-1 text-sm">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          
          <p className="font-medium text-sm">
            {formatPrice(product.price * quantity)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
