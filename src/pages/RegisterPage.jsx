
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
    wantsToBeAffiliate: false
  });

  if (isAuthenticated) {
    navigate('/account');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Mật khẩu không khớp",
        description: "Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const success = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.referralCode,
        formData.wantsToBeAffiliate
      );
      
      if (success) {
        toast({
          title: "Đăng ký thành công",
          description: "Chào mừng bạn đến với Hera Tea!",
        });
        navigate('/account');
      } else {
        toast({
          title: "Đăng ký thất bại",
          description: "Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại sau.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Đăng ký thất bại",
        description: "Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-tea-light">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-medium text-tea-dark">Đăng ký tài khoản</h1>
          <p className="mt-2 text-sm text-tea-medium">
            Tạo tài khoản để mua hàng, tích điểm và nhận nhiều ưu đãi hấp dẫn
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-tea-dark">
                Họ và tên
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="input-style w-full mt-1"
                placeholder="Nhập họ và tên"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-tea-dark">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-style w-full mt-1"
                placeholder="vd: email@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-tea-dark">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="input-style w-full mt-1"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-tea-dark">
                Xác nhận mật khẩu
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="input-style w-full mt-1"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="referralCode" className="block text-sm font-medium text-tea-dark">
                Mã giới thiệu (nếu có)
              </label>
              <input
                id="referralCode"
                name="referralCode"
                type="text"
                className="input-style w-full mt-1"
                placeholder="Nhập mã giới thiệu nếu có"
                value={formData.referralCode}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="wantsToBeAffiliate"
                name="wantsToBeAffiliate"
                type="checkbox"
                className="h-4 w-4 text-tea-medium focus:ring-tea-medium border-gray-300 rounded"
                checked={formData.wantsToBeAffiliate}
                onChange={handleInputChange}
              />
              <label htmlFor="wantsToBeAffiliate" className="ml-2 block text-sm text-tea-medium">
                Tôi muốn trở thành cộng tác viên
              </label>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-tea-medium focus:ring-tea-medium border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-tea-medium">
              Tôi đồng ý với <a href="#" className="text-primary hover:underline">điều khoản</a> và <a href="#" className="text-primary hover:underline">chính sách bảo mật</a>
            </label>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-tea-medium">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
        
        <div className="mt-6 text-center">
          <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Quay về trang chủ
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
