
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/format';
import CartItem from '@/components/CartItem';
import ReferralCodeBanner from '@/components/ReferralCodeBanner';

const CartPage = () => {
  const { cart, totalPrice } = useCart();
  const shippingFee = totalPrice >= 500000 || totalPrice === 0 ? 0 : 30000;
  const finalTotal = totalPrice + shippingFee;

  return (
    <Layout>
      <div className="bg-tea-light py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">Giỏ hàng của bạn</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-xl font-medium mb-6 flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2 text-tea-medium" />
                  <span>Giỏ hàng ({cart.length} sản phẩm)</span>
                </h2>
                
                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <p className="text-tea-medium">
                    <Link to="/products" className="text-primary hover:underline">
                      ← Tiếp tục mua sắm
                    </Link>
                  </p>
                  <Button asChild size="lg">
                    <Link to="/checkout" className="flex items-center">
                      Tiến hành thanh toán <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-xl font-medium mb-4">Tóm tắt đơn hàng</h2>
                
                <div className="space-y-2 py-4">
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
                
                <Button asChild className="w-full mt-4" size="lg">
                  <Link to="/checkout">Tiến hành thanh toán</Link>
                </Button>
              </div>
              
              <ReferralCodeBanner />
            </div>
          </div>
        ) : (
          <div className="bg-white p-10 rounded-lg border border-gray-200 shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="h-16 w-16 text-tea-medium/30" />
            </div>
            <h2 className="text-2xl font-serif mb-4">Giỏ hàng của bạn đang trống</h2>
            <p className="text-tea-medium mb-8">
              Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá và thêm sản phẩm yêu thích vào giỏ hàng.
            </p>
            <Button asChild size="lg">
              <Link to="/products">
                Khám phá sản phẩm
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
