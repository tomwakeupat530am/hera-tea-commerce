
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/format';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    orderNotes: '',
    paymentMethod: 'cod',
    referralCode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate order processing
    setTimeout(() => {
      toast({
        title: "Đặt hàng thành công!",
        description: "Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất.",
      });
      
      clearCart();
      navigate('/order-success');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-serif mb-6">Giỏ hàng trống</h1>
          <p className="mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
          <Button onClick={() => navigate('/products')}>Tiếp tục mua sắm</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-tea-light py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">Thanh toán</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg border border-tea-medium/20 shadow-sm">
              <h2 className="text-xl font-serif mb-6">Thông tin khách hàng</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block mb-1 font-medium">Họ và tên *</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="input-style w-full"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="input-style w-full"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block mb-1 font-medium">Số điện thoại *</label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    className="input-style w-full"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-tea-medium/20 shadow-sm">
              <h2 className="text-xl font-serif mb-6">Địa chỉ giao hàng</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block mb-1 font-medium">Địa chỉ *</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    className="input-style w-full"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block mb-1 font-medium">Quận/Huyện *</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      className="input-style w-full"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="province" className="block mb-1 font-medium">Tỉnh/Thành phố *</label>
                    <input
                      id="province"
                      name="province"
                      type="text"
                      className="input-style w-full"
                      value={formData.province}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="postalCode" className="block mb-1 font-medium">Mã bưu điện</label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    className="input-style w-full"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="orderNotes" className="block mb-1 font-medium">Ghi chú</label>
                  <textarea
                    id="orderNotes"
                    name="orderNotes"
                    rows={3}
                    className="input-style w-full"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-tea-medium/20 shadow-sm">
              <h2 className="text-xl font-serif mb-6">Mã giới thiệu / Affiliate</h2>
              
              <div>
                <label htmlFor="referralCode" className="block mb-1 font-medium">Mã giới thiệu (nếu có)</label>
                <input
                  id="referralCode"
                  name="referralCode"
                  type="text"
                  className="input-style w-full"
                  value={formData.referralCode}
                  onChange={handleInputChange}
                  placeholder="Nhập mã giới thiệu nếu có"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white p-6 rounded-lg border border-tea-medium/20 shadow-sm sticky top-24">
              <h2 className="text-xl font-serif mb-6">Đơn hàng của bạn</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center pb-3 border-b border-tea-light">
                    <div className="flex items-center">
                      <div className="w-16 h-16 mr-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-tea-medium text-sm">Số lượng: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pb-4 border-b border-tea-light">
                <div className="flex justify-between mb-2">
                  <span>Tạm tính</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
              </div>

              <div className="flex justify-between py-4 mb-6 border-b border-tea-light">
                <span className="font-medium">Tổng cộng</span>
                <span className="text-xl font-medium">{formatPrice(totalPrice)}</span>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="font-medium">Phương thức thanh toán</h3>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="cod">Thanh toán khi nhận hàng (COD)</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="bankTransfer"
                    name="paymentMethod"
                    value="bankTransfer"
                    checked={formData.paymentMethod === 'bankTransfer'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="bankTransfer">Chuyển khoản ngân hàng</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="vnpay"
                    name="paymentMethod"
                    value="vnpay"
                    checked={formData.paymentMethod === 'vnpay'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="vnpay">Thanh toán qua VNPay</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="momo"
                    name="paymentMethod"
                    value="momo"
                    checked={formData.paymentMethod === 'momo'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="momo">Thanh toán qua Momo</label>
                </div>
              </div>

              <Button type="submit" className="w-full py-6 text-lg" size="lg">
                Đặt hàng
              </Button>
              
              {!isAuthenticated && (
                <p className="text-sm text-tea-medium mt-4 text-center">
                  * Đăng nhập để tích điểm và nhận ưu đãi
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
