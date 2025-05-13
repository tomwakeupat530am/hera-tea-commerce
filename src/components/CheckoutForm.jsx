
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phoneNumber: '',
    email: user?.email || '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
    paymentMethod: 'cod',
    referralCode: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast({
        title: "Giỏ hàng trống",
        description: "Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Normally this would be an API call to create an order
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, we would send this data to the server
      const orderData = {
        items: cart,
        total: totalPrice,
        customer: {
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          email: formData.email
        },
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          province: formData.province,
          postalCode: formData.postalCode
        },
        paymentMethod: formData.paymentMethod,
        referralCode: formData.referralCode,
        notes: formData.notes,
        userId: isAuthenticated ? user.id : null,
        date: new Date().toISOString()
      };
      
      console.log('Order data', orderData);
      
      // Clear cart after successful order
      clearCart();
      
      toast({
        title: "Đặt hàng thành công!",
        description: "Đơn hàng của bạn đã được tạo thành công."
      });
      
      // Redirect to success page
      navigate('/order-success');
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Đặt hàng thất bại",
        description: "Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">1. Thông tin liên hệ</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-1">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="input-style w-full"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="input-style w-full"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-style w-full"
              required
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">2. Địa chỉ giao hàng</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="street" className="block text-sm font-medium mb-1">
              Địa chỉ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              className="input-style w-full"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-1">
                Quận/Huyện <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="input-style w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="province" className="block text-sm font-medium mb-1">
                Tỉnh/Thành phố <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="province"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                className="input-style w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium mb-1">
                Mã bưu điện
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="input-style w-full"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">3. Phương thức thanh toán</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="radio"
              id="cod"
              name="paymentMethod"
              value="cod"
              checked={formData.paymentMethod === 'cod'}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary"
            />
            <label htmlFor="cod" className="ml-2 block text-sm">
              Thanh toán khi nhận hàng (COD)
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="bankTransfer"
              name="paymentMethod"
              value="bankTransfer"
              checked={formData.paymentMethod === 'bankTransfer'}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary"
            />
            <label htmlFor="bankTransfer" className="ml-2 block text-sm">
              Chuyển khoản ngân hàng
            </label>
          </div>
          
          {formData.paymentMethod === 'bankTransfer' && (
            <div className="bg-gray-50 p-3 rounded-md ml-6 mt-2 text-sm">
              <p>Thông tin chuyển khoản:</p>
              <p>Ngân hàng: Vietcombank</p>
              <p>Số tài khoản: 1234567890</p>
              <p>Chủ tài khoản: CÔNG TY TNHH HERA TEA</p>
              <p>Nội dung: [Họ tên] - [Số điện thoại]</p>
            </div>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">4. Thông tin khác</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="referralCode" className="block text-sm font-medium mb-1">
              Mã giới thiệu (nếu có)
            </label>
            <input
              type="text"
              id="referralCode"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleInputChange}
              className="input-style w-full"
            />
          </div>
          
          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-1">
              Ghi chú đơn hàng
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="input-style w-full"
              placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay địa điểm giao hàng chi tiết hơn."
            />
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isLoading || cart.length === 0}
          className="w-full"
          size="lg"
        >
          {isLoading ? 'Đang xử lý...' : 'Hoàn tất đặt hàng'}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
