
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccessPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-24 w-24 text-secondary" />
          </div>
          
          <h1 className="text-3xl font-serif mb-4">Đặt hàng thành công!</h1>
          
          <p className="mb-8 text-tea-medium">
            Cảm ơn bạn đã đặt hàng tại Hera Tea. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.
            Một email xác nhận đã được gửi đến địa chỉ email của bạn.
          </p>
          
          <div className="bg-tea-light p-6 rounded-lg mb-8">
            <p className="font-medium mb-2">Mã đơn hàng: #HT0012345</p>
            <p className="text-tea-medium">Ngày đặt: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button asChild>
              <Link to="/account/orders">Kiểm tra đơn hàng</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/products">Tiếp tục mua sắm</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccessPage;
