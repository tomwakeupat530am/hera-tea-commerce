
import React from 'react';
import { X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/utils/format';
import CartItem from './CartItem';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, totalItems, totalPrice, clearCart } = useCart();

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0'}`} 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-serif text-lg font-medium">Giỏ hàng ({totalItems})</h2>
          <button 
            onClick={onClose}
            className="text-tea-dark hover:text-primary rounded-full p-1 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-grow overflow-y-auto p-4">
          {cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map(item => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-tea-medium mb-4">Giỏ hàng của bạn đang trống</p>
              <Button onClick={onClose} variant="outline">Tiếp tục mua sắm</Button>
            </div>
          )}
        </div>
        
        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            <div className="flex justify-between items-center font-medium">
              <span>Tổng tiền</span>
              <span className="text-lg">{formatPrice(totalPrice)}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={clearCart}
                variant="outline" 
                className="w-full"
              >
                Xóa giỏ hàng
              </Button>
              <Button 
                className="w-full" 
                asChild
              >
                <Link to="/checkout" onClick={onClose}>Thanh toán</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
