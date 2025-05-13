
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/format';

const OrderSummary = () => {
  const { cart, totalPrice } = useCart();
  const shippingFee = totalPrice >= 500000 || totalPrice === 0 ? 0 : 30000;
  const finalTotal = totalPrice + shippingFee;

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-medium mb-4">Tóm tắt đơn hàng</h3>
      
      <div className="mb-4">
        <div className="max-h-60 overflow-y-auto pr-2">
          {cart.map((item) => (
            <div key={item.product.id} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
              <div className="flex items-center">
                <span className="font-medium">
                  {item.quantity} ×
                </span>
                <span className="ml-2 text-sm line-clamp-1">{item.product.name}</span>
              </div>
              <span className="text-sm">{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        {cart.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            <p>Giỏ hàng của bạn đang trống</p>
            <Link to="/products" className="text-primary hover:underline text-sm mt-2 inline-block">
              Tiếp tục mua sắm
            </Link>
          </div>
        )}
      </div>
      
      <div className="space-y-2 py-4 border-t border-gray-200">
        <div className="flex justify-between">
          <span className="text-gray-600">Tạm tính</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Phí vận chuyển</span>
          {shippingFee === 0 ? (
            <span className="text-green-600">Miễn phí</span>
          ) : (
            <span>{formatPrice(shippingFee)}</span>
          )}
        </div>
        
        {totalPrice < 500000 && totalPrice > 0 && (
          <div className="text-xs text-gray-500 mt-1">
            Miễn phí vận chuyển cho đơn hàng từ {formatPrice(500000)}
          </div>
        )}
      </div>
      
      <div className="flex justify-between py-4 border-t border-gray-200 font-medium">
        <span>Tổng cộng</span>
        <span className="text-lg text-primary">{formatPrice(finalTotal)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
