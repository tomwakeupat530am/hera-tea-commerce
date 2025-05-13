
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/utils/format';
import { Copy, Share2, TrendingDown, TrendingUp, Users, FileText, FileSpreadsheet } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from '@/hooks/use-toast';
import affiliateService from '@/services/affiliateService';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCommission: 0,
    pendingCommission: 0,
    monthlyCommission: 0,
    lastMonthCommission: 0,
    totalOrders: 0,
    referralCode: '',
    recentOrders: []
  });

  useEffect(() => {
    const fetchAffiliateData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call - in a real app, use your affiliateService
        // const data = await affiliateService.getAffiliateStats();
        
        // Mẫu dữ liệu - sẽ được thay thế bằng dữ liệu thực từ API
        const dummyData = {
          totalCommission: 1800000,
          pendingCommission: 650000,
          monthlyCommission: 950000,
          lastMonthCommission: 1500000,
          totalOrders: 5,
          totalSales: 2560000,
          referralCode: 'HERA-PARTNER35',
          recentOrders: [
            { id: 'ORD-2001', customer: 'Nguyễn Văn A', date: '15/05/2025', amount: 320000, commission: 112000, status: 'Hoàn thành' },
            { id: 'ORD-1985', customer: 'Trần Thị B', date: '10/05/2025', amount: 320000, commission: 112000, status: 'Hoàn thành' },
            { id: 'ORD-1967', customer: 'Lê Văn C', date: '05/05/2025', amount: 320000, commission: 112000, status: 'Hoàn thành' },
          ]
        };
        
        setStats(dummyData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching affiliate data:', error);
        toast({
          title: "Lỗi",
          description: "Không thể tải dữ liệu cộng tác viên",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };

    if (isAuthenticated && user?.isAffiliate) {
      fetchAffiliateData();
    }
  }, [isAuthenticated, user, toast]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user?.isAffiliate) {
    return <Navigate to="/account" />;
  }
  
  // Calculate percentage change
  const percentChange = stats.lastMonthCommission > 0 
    ? Math.round((stats.monthlyCommission - stats.lastMonthCommission) / stats.lastMonthCommission * 100) 
    : 0;
  
  // Calculate progress towards goal
  const monthlyGoal = 1500000; // Goal is 1.5M VND
  const progressPercentage = Math.min((stats.monthlyCommission / monthlyGoal) * 100, 100);

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(stats.referralCode);
    toast({
      title: "Đã sao chép",
      description: "Mã giới thiệu đã được sao chép vào clipboard"
    });
  };

  const handleShareReferralCode = () => {
    // In a real app, show a modal with sharing options
    if (navigator.share) {
      navigator.share({
        title: 'Hera Tea - Mã giới thiệu',
        text: `Dùng mã ${stats.referralCode} để nhận ưu đãi khi mua trà tại Hera Tea!`,
        url: window.location.origin,
      });
    } else {
      toast({
        title: "Chia sẻ",
        description: "Hãy sao chép mã và chia sẻ với bạn bè của bạn!"
      });
    }
  };

  const handleWithdrawRequest = () => {
    // In a real app, show a withdraw request form modal
    toast({
      title: "Yêu cầu rút tiền",
      description: "Chức năng đang được phát triển"
    });
  };

  return (
    <Layout>
      <div className="bg-tea-light py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">Trang cộng tác viên</h1>
          <p className="text-center text-tea-medium mt-2">Quản lý hoạt động cộng tác viên của bạn.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header with withdraw button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-serif">Bảng điều khiển cộng tác viên</h2>
          </div>
          <Button onClick={handleWithdrawRequest} className="bg-green-700 hover:bg-green-800">
            Rút hoa hồng
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Commission */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-tea-medium mb-1">Hoa hồng khả dụng</h3>
            <div className="flex items-center">
              <p className="text-2xl font-medium">{formatPrice(stats.totalCommission)}</p>
              <button className="ml-2 text-gray-400" onClick={() => {}}>
                <FileSpreadsheet className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-tea-medium mt-2">Đang chờ duyệt: {formatPrice(stats.pendingCommission)}</p>
          </div>

          {/* Monthly Commission */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-tea-medium mb-1">Hoa hồng tháng này</h3>
            <div className="flex items-center">
              <p className="text-2xl font-medium">{formatPrice(stats.monthlyCommission)}</p>
              <button className="ml-2 text-gray-400" onClick={() => {}}>
                <FileText className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center text-sm mt-2">
              <span className={`flex items-center ${percentChange < 0 ? 'text-red-500' : 'text-green-500'}`}>
                {percentChange < 0 ? (
                  <TrendingDown className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingUp className="h-4 w-4 mr-1" />
                )}
                {Math.abs(percentChange)}% so với tháng trước
              </span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>{formatPrice(stats.monthlyCommission)}</span>
                <span>Mục tiêu: {formatPrice(monthlyGoal)}</span>
              </div>
              <Progress value={progressPercentage} className="h-1.5" />
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-tea-medium mb-1">Tổng đơn hàng</h3>
            <div className="flex items-center">
              <p className="text-2xl font-medium">{stats.totalOrders}</p>
              <button className="ml-2 text-gray-400" onClick={() => {}}>
                <Users className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-tea-medium mt-2">Tổng doanh số: {formatPrice(stats.totalSales)}</p>
          </div>

          {/* Referral Code */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-tea-medium mb-1">Mã cộng tác viên</h3>
            <div className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-md">
              <p className="font-medium flex-1">{stats.referralCode}</p>
              <button 
                className="text-gray-500 hover:text-primary mr-1"
                onClick={handleCopyReferralCode}
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4 flex items-center justify-center"
              onClick={handleShareReferralCode}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Chia sẻ mã
            </Button>
          </div>
        </div>

        {/* Tabs for Orders, Withdrawals, etc. */}
        <Tabs defaultValue="orders" className="w-full mt-8">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Đơn hàng từ giới thiệu</TabsTrigger>
            <TabsTrigger value="withdrawals">Lịch sử rút tiền</TabsTrigger>
            <TabsTrigger value="materials">Tài liệu tiếp thị</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-xl font-serif mb-6">Đơn hàng từ giới thiệu</h3>
            <p className="text-sm text-tea-medium mb-4">Danh sách các đơn hàng từ khách hàng bạn đã giới thiệu</p>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Ngày đặt</TableHead>
                    <TableHead>Giá trị đơn</TableHead>
                    <TableHead>Hoa hồng</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{formatPrice(order.amount)}</TableCell>
                      <TableCell className="text-green-600">{formatPrice(order.commission)}</TableCell>
                      <TableCell>
                        <Button variant="link" size="sm">Chi tiết</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="withdrawals" className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-xl font-serif mb-6">Lịch sử rút tiền</h3>
            <p className="text-center py-8 text-tea-medium">
              Chưa có lịch sử rút tiền
            </p>
          </TabsContent>
          
          <TabsContent value="materials" className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-xl font-serif mb-6">Tài liệu tiếp thị</h3>
            <p className="text-center py-8 text-tea-medium">
              Đang cập nhật tài liệu...
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
