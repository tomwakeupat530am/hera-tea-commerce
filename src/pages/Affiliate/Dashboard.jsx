
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/utils/format';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user.isAffiliate) {
    return <Navigate to="/account" />;
  }

  // Mẫu dữ liệu - sẽ được thay thế bằng dữ liệu thực từ API
  const affiliateStats = {
    totalReferrals: 15,
    totalEarnings: 2450000,
    pendingCommission: 150000,
    withdrawnCommission: 2300000,
    referralCode: user.referralCode,
    conversionRate: '8.6%'
  };

  const recentOrders = [
    { id: 'ORD-2001', customer: 'Nguyễn Văn A', date: '2023-11-15', amount: 450000, commission: 157500 },
    { id: 'ORD-1985', customer: 'Trần Thị B', date: '2023-11-10', amount: 280000, commission: 98000 },
    { id: 'ORD-1967', customer: 'Lê Văn C', date: '2023-11-05', amount: 360000, commission: 126000 },
  ];

  const withdrawalHistory = [
    { id: 'WTH-102', date: '2023-10-15', amount: 1500000, status: 'Đã thanh toán' },
    { id: 'WTH-095', date: '2023-09-20', amount: 800000, status: 'Đã thanh toán' },
  ];

  return (
    <Layout>
      <div className="bg-tea-light py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">Cộng tác viên</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {/* Dashboard Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h2 className="text-2xl font-serif">Bảng điều khiển cộng tác viên</h2>
                <p className="text-tea-medium mt-1">Xin chào, {user.name}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button>Yêu cầu rút tiền</Button>
              </div>
            </div>
          </div>
          
          {/* Dashboard Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Tổng quan
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'orders'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Đơn hàng
              </button>
              <button
                onClick={() => setActiveTab('withdrawals')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'withdrawals'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Lịch sử rút tiền
              </button>
            </nav>
          </div>
          
          {/* Dashboard Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-tea-light rounded-lg p-6">
                    <h3 className="text-sm font-medium text-tea-medium mb-1">Tổng số đơn</h3>
                    <p className="text-2xl font-medium">{affiliateStats.totalReferrals}</p>
                  </div>
                  
                  <div className="bg-tea-light rounded-lg p-6">
                    <h3 className="text-sm font-medium text-tea-medium mb-1">Tổng hoa hồng</h3>
                    <p className="text-2xl font-medium">{formatPrice(affiliateStats.totalEarnings)}</p>
                  </div>
                  
                  <div className="bg-tea-light rounded-lg p-6">
                    <h3 className="text-sm font-medium text-tea-medium mb-1">Hoa hồng chờ rút</h3>
                    <p className="text-2xl font-medium">{formatPrice(affiliateStats.pendingCommission)}</p>
                  </div>
                  
                  <div className="bg-tea-light rounded-lg p-6">
                    <h3 className="text-sm font-medium text-tea-medium mb-1">Tỷ lệ chuyển đổi</h3>
                    <p className="text-2xl font-medium">{affiliateStats.conversionRate}</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Mã giới thiệu của bạn</h3>
                  <div className="bg-tea-light p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-3 md:mb-0">
                      <span className="font-medium">{affiliateStats.referralCode}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(affiliateStats.referralCode);
                          alert('Đã sao chép mã giới thiệu!');
                        }}
                      >
                        Sao chép mã
                      </Button>
                      <Button variant="outline">
                        Chia sẻ mã
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Đơn hàng gần đây</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mã đơn hàng</TableHead>
                          <TableHead>Khách hàng</TableHead>
                          <TableHead>Ngày</TableHead>
                          <TableHead>Giá trị đơn</TableHead>
                          <TableHead>Hoa hồng</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{formatPrice(order.amount)}</TableCell>
                            <TableCell className="text-green-600">{formatPrice(order.commission)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Tất cả đơn hàng</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã đơn hàng</TableHead>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Ngày</TableHead>
                        <TableHead>Giá trị đơn</TableHead>
                        <TableHead>Hoa hồng</TableHead>
                        <TableHead>Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{formatPrice(order.amount)}</TableCell>
                          <TableCell className="text-green-600">{formatPrice(order.commission)}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              Hoàn thành
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
            
            {activeTab === 'withdrawals' && (
              <div>
                <div className="mb-6 p-4 bg-tea-light rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="font-medium">Số dư khả dụng</h3>
                      <p className="text-2xl font-medium text-primary mt-1">
                        {formatPrice(affiliateStats.pendingCommission)}
                      </p>
                    </div>
                    <Button>Yêu cầu rút tiền</Button>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-4">Lịch sử rút tiền</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã giao dịch</TableHead>
                        <TableHead>Ngày</TableHead>
                        <TableHead>Số tiền</TableHead>
                        <TableHead>Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {withdrawalHistory.map((withdrawal) => (
                        <TableRow key={withdrawal.id}>
                          <TableCell className="font-medium">{withdrawal.id}</TableCell>
                          <TableCell>{withdrawal.date}</TableCell>
                          <TableCell>{formatPrice(withdrawal.amount)}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              {withdrawal.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
