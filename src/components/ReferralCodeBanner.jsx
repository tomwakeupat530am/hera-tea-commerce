
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const ReferralCodeBanner = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="bg-tea-light p-6 rounded-lg shadow-sm text-center">
        <h3 className="text-xl font-serif mb-3">Kiếm thêm thu nhập với Hera Tea</h3>
        <p className="text-tea-medium mb-4">
          Trở thành cộng tác viên và nhận 35% hoa hồng cho mỗi đơn hàng từ mã giới thiệu của bạn.
        </p>
        <Button asChild>
          <Link to="/register">Đăng ký ngay</Link>
        </Button>
      </div>
    );
  }

  // Nếu người dùng đã đăng nhập nhưng không phải là CTV
  if (!user.isAffiliate) {
    return (
      <div className="bg-tea-light p-6 rounded-lg shadow-sm text-center">
        <h3 className="text-xl font-serif mb-3">Trở thành cộng tác viên</h3>
        <p className="text-tea-medium mb-4">
          Bạn có thể đăng ký làm cộng tác viên để nhận 35% hoa hồng từ mỗi đơn hàng.
        </p>
        <Button asChild>
          <Link to="/affiliate">Tìm hiểu thêm</Link>
        </Button>
      </div>
    );
  }

  // Nếu người dùng là CTV
  return (
    <div className="bg-tea-light p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-serif mb-3">Mã giới thiệu của bạn</h3>
      <div className="bg-white p-3 rounded-md border border-tea-medium/20 flex justify-between items-center mb-4">
        <span className="font-medium">{user.referralCode}</span>
        <button 
          className="text-primary text-sm hover:underline"
          onClick={() => {
            navigator.clipboard.writeText(user.referralCode);
            alert('Đã sao chép mã giới thiệu!');
          }}
        >
          Sao chép
        </button>
      </div>
      <p className="text-tea-medium text-sm">
        Chia sẻ mã này với bạn bè và nhận 35% hoa hồng khi họ mua hàng.
      </p>
      <div className="mt-4 text-right">
        <Button asChild variant="outline" size="sm">
          <Link to="/affiliate">Xem thống kê</Link>
        </Button>
      </div>
    </div>
  );
};

export default ReferralCodeBanner;
