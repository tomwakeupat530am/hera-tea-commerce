
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/utils/format';
import AccountMenu from '@/components/Account/AccountMenu';

const AccountPage = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="bg-tea-light py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">Tài khoản của tôi</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <AccountMenu activePath="/account" />

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white p-6 rounded-lg border border-tea-medium/20 shadow-sm">
              <h2 className="text-xl font-serif mb-6">Thông tin tài khoản</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-tea-medium">Họ và tên</p>
                    <p className="font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-tea-medium">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-tea-medium">Vai trò</p>
                  <p className="font-medium">{user?.isAffiliate ? 'Cộng tác viên' : 'Khách hàng'}</p>
                </div>

                <div>
                  <p className="text-sm text-tea-medium">Mã giới thiệu của bạn</p>
                  <div className="flex items-center mt-1">
                    <div className="border border-tea-medium/20 rounded-md p-2 bg-tea-light font-medium">
                      {user?.referralCode}
                    </div>
                    <Button
                      variant="outline"
                      className="ml-3"
                      onClick={() => {
                        navigator.clipboard.writeText(user?.referralCode || '');
                        toast({
                          title: "Đã sao chép",
                          description: "Mã giới thiệu đã được sao chép vào clipboard"
                        });
                      }}
                    >
                      Sao chép
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-tea-medium/20 shadow-sm">
                <h2 className="text-lg font-serif mb-4">Điểm thưởng</h2>
                <div className="text-3xl font-medium mb-4">{user?.points} <span className="text-lg text-tea-medium">điểm</span></div>
                
                <div className="text-sm text-tea-medium mb-4">
                  Mỗi 300 điểm có thể đổi lấy một hộp trà miễn phí.
                </div>
                
                <Button asChild className="w-full">
                  <Link to="/account/points">Xem thông tin điểm</Link>
                </Button>
              </div>

              {user?.isAffiliate && (
                <div className="bg-white p-6 rounded-lg border border-tea-medium/20 shadow-sm">
                  <h2 className="text-lg font-serif mb-4">Hoa hồng Affiliate</h2>
                  <div className="text-3xl font-medium mb-4">{formatPrice(user.affiliateCommission || 0)}</div>
                  
                  <div className="text-sm text-tea-medium mb-4">
                    Tổng hoa hồng đã tích lũy từ các đơn hàng sử dụng mã affiliate của bạn.
                  </div>
                  
                  <Button asChild className="w-full">
                    <Link to="/account/affiliate">Quản lý doanh thu</Link>
                  </Button>
                </div>
              )}

              {!user?.isAffiliate && (
                <div className="bg-white p-6 rounded-lg border border-tea-medium/20 shadow-sm">
                  <h2 className="text-lg font-serif mb-4">Chương trình cộng tác viên</h2>
                  
                  <div className="text-sm text-tea-medium mb-4">
                    Đăng ký làm cộng tác viên để hưởng hoa hồng 35% cho mỗi đơn hàng thông qua mã giới thiệu của bạn.
                  </div>
                  
                  <Button asChild className="w-full">
                    <Link to="/affiliate">Tìm hiểu thêm</Link>
                  </Button>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg border border-tea-medium/20 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif">Đơn hàng gần đây</h2>
                <Link to="/account/orders" className="text-primary hover:underline">Xem tất cả</Link>
              </div>
              
              <div className="text-center py-8 text-tea-medium">
                <p>Bạn chưa có đơn hàng nào.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;
