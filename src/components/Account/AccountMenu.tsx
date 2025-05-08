
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { 
  User, 
  Package, 
  Award, 
  Settings, 
  Users 
} from 'lucide-react';

interface AccountMenuProps {
  activePath: string;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ activePath }) => {
  const { user, logout } = useAuth();

  return (
    <div>
      <div className="bg-white p-6 rounded-lg border border-tea-medium/20 shadow-sm">
        <h2 className="text-xl font-serif mb-6">Tài khoản</h2>
        
        <nav className="space-y-2">
          <Link
            to="/account"
            className={`flex items-center p-3 rounded-md ${
              activePath === "/account" 
                ? "bg-accent text-tea-dark font-medium" 
                : "hover:bg-accent transition-colors"
            }`}
          >
            <User className="h-4 w-4 mr-2" />
            Tổng quan
          </Link>
          <Link
            to="/account/orders"
            className={`flex items-center p-3 rounded-md ${
              activePath === "/account/orders" 
                ? "bg-accent text-tea-dark font-medium" 
                : "hover:bg-accent transition-colors"
            }`}
          >
            <Package className="h-4 w-4 mr-2" />
            Đơn hàng của tôi
          </Link>
          <Link
            to="/account/points"
            className={`flex items-center p-3 rounded-md ${
              activePath === "/account/points" 
                ? "bg-accent text-tea-dark font-medium" 
                : "hover:bg-accent transition-colors"
            }`}
          >
            <Award className="h-4 w-4 mr-2" />
            Điểm thưởng
          </Link>
          {user?.isAffiliate && (
            <Link
              to="/account/affiliate"
              className={`flex items-center p-3 rounded-md ${
                activePath === "/account/affiliate" 
                  ? "bg-accent text-tea-dark font-medium" 
                  : "hover:bg-accent transition-colors"
              }`}
            >
              <Users className="h-4 w-4 mr-2" />
              Quản lý Affiliate
            </Link>
          )}
          <Link
            to="/account/settings"
            className={`flex items-center p-3 rounded-md ${
              activePath === "/account/settings" 
                ? "bg-accent text-tea-dark font-medium" 
                : "hover:bg-accent transition-colors"
            }`}
          >
            <Settings className="h-4 w-4 mr-2" />
            Cài đặt tài khoản
          </Link>
        </nav>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button
            onClick={logout}
            variant="outline"
            className="w-full"
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
