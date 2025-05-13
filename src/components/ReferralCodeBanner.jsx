
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Copy, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReferralCodeBanner = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleCopyCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      toast({
        title: "Đã sao chép",
        description: "Mã giới thiệu đã được sao chép vào clipboard"
      });
    }
  };

  const handleShareCode = () => {
    if (navigator.share && user?.referralCode) {
      navigator.share({
        title: 'Hera Tea - Mã giới thiệu',
        text: `Dùng mã ${user.referralCode} để nhận ưu đãi khi mua trà tại Hera Tea!`,
        url: window.location.origin,
      });
    } else {
      toast({
        title: "Chia sẻ",
        description: "Hãy sao chép mã và chia sẻ với bạn bè của bạn!"
      });
    }
  };

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
          className="text-primary hover:text-primary/80"
          onClick={handleCopyCode}
        >
          <Copy className="h-4 w-4" />
        </button>
      </div>
      <p className="text-tea-medium text-sm">
        Chia sẻ mã này với bạn bè và nhận 35% hoa hồng khi họ mua hàng.
      </p>
      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm" className="flex items-center" onClick={handleShareCode}>
          <Share2 className="h-4 w-4 mr-2" />
          Chia sẻ mã
        </Button>
        <Button asChild variant="outline" size="sm" className="ml-2">
          <Link to="/account/affiliate">Xem thống kê</Link>
        </Button>
      </div>
    </div>
  );
};

export default ReferralCodeBanner;
