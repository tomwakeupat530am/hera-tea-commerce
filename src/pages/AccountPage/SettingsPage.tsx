
import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserCog } from 'lucide-react';
import AccountMenu from '@/components/Account/AccountMenu';

const SettingsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Cập nhật thành công",
      description: "Thông tin tài khoản của bạn đã được cập nhật",
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu mới không khớp với mật khẩu xác nhận",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Đổi mật khẩu thành công",
      description: "Mật khẩu của bạn đã được cập nhật",
    });
    
    // Reset password fields
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  };

  return (
    <Layout>
      <div className="bg-tea-light py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">Cài đặt tài khoản</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <AccountMenu activePath="/account/settings" />

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile Settings */}
            <div className="bg-white p-6 rounded-lg border border-tea-medium/20 shadow-sm">
              <div className="flex items-center mb-6">
                <UserCog className="h-6 w-6 mr-2 text-primary" />
                <h2 className="text-xl font-serif">Thông tin cá nhân</h2>
              </div>
              
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Nhập email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                
                <Button type="submit">Cập nhật thông tin</Button>
              </form>
            </div>
            
            {/* Password Settings */}
            <div className="bg-white p-6 rounded-lg border border-tea-medium/20 shadow-sm">
              <h2 className="text-xl font-serif mb-6">Đổi mật khẩu</h2>
              
              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu hiện tại"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Mật khẩu mới</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu mới"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Xác nhận mật khẩu mới"
                    />
                  </div>
                </div>
                
                <Button type="submit">Đổi mật khẩu</Button>
              </form>
            </div>
            
            {/* Notification Settings */}
            <div className="bg-white p-6 rounded-lg border border-tea-medium/20 shadow-sm">
              <h2 className="text-xl font-serif mb-6">Tùy chọn thông báo</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Thông báo về đơn hàng</p>
                    <p className="text-sm text-tea-medium">Nhận thông báo về trạng thái đơn hàng</p>
                  </div>
                  <div>
                    <input type="checkbox" id="orderNotification" className="toggle" defaultChecked />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Thông báo về khuyến mãi</p>
                    <p className="text-sm text-tea-medium">Nhận thông báo về chương trình khuyến mãi</p>
                  </div>
                  <div>
                    <input type="checkbox" id="promoNotification" className="toggle" defaultChecked />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Thông báo về điểm thưởng</p>
                    <p className="text-sm text-tea-medium">Nhận thông báo khi có thay đổi điểm thưởng</p>
                  </div>
                  <div>
                    <input type="checkbox" id="pointsNotification" className="toggle" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Button className="mt-6">Lưu tùy chọn</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
