
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Award } from 'lucide-react';
import AccountMenu from '@/components/Account/AccountMenu';

const PointsPage = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const pointsNeeded = 300; // Điểm cần để đổi 1 hộp trà
  const progress = user ? (user.points % pointsNeeded) / pointsNeeded * 100 : 0;
  const canRedeem = user ? user.points >= pointsNeeded : false;

  return (
    <Layout>
      <div className="bg-tea-light py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">Điểm thưởng</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <AccountMenu activePath="/account/points" />

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Points Summary */}
            <div className="bg-white p-6 rounded-lg border border-tea-medium/20 shadow-sm">
              <div className="flex items-center mb-6">
                <Award className="h-6 w-6 mr-2 text-primary" />
                <h2 className="text-xl font-serif">Điểm thưởng của tôi</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-tea-medium mb-1">Tổng điểm hiện có</p>
                  <p className="text-3xl font-medium">{user?.points || 0} <span className="text-sm text-tea-medium">điểm</span></p>
                  
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Tiến độ đổi quà tiếp theo</span>
                      <span>{user?.points % pointsNeeded || 0}/{pointsNeeded}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-tea-medium mt-2">
                      Còn {pointsNeeded - (user?.points % pointsNeeded || 0)} điểm nữa để đổi 1 hộp trà
                    </p>
                  </div>

                  <Button 
                    className="mt-6 w-full"
                    disabled={!canRedeem}
                  >
                    {canRedeem 
                      ? `Đổi ngay ${Math.floor((user?.points || 0) / pointsNeeded)} hộp trà` 
                      : 'Chưa đủ điểm để đổi quà'}
                  </Button>
                </div>

                <div className="bg-tea-light p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Cách tích điểm</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <div className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">1</div>
                      <p>Giới thiệu bạn bè sử dụng mã giới thiệu của bạn</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">2</div>
                      <p>Người bạn giới thiệu mua hàng với giá trị từ 250.000₫</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">3</div>
                      <p>Bạn nhận ngay <span className="font-medium">250 điểm</span> vào tài khoản</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">4</div>
                      <p>Tích đủ <span className="font-medium">300 điểm</span> đổi ngay 1 hộp trà miễn phí</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Points History */}
            <div className="bg-white p-6 rounded-lg border border-tea-medium/20 shadow-sm">
              <h2 className="text-xl font-serif mb-6">Lịch sử điểm thưởng</h2>
              
              {user?.pointsHistory && user.pointsHistory.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ngày</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead>Điểm</TableHead>
                        <TableHead>Loại</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {user.pointsHistory.map((history) => (
                        <TableRow key={history.id}>
                          <TableCell>{history.date}</TableCell>
                          <TableCell>{history.description}</TableCell>
                          <TableCell>{history.points}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              history.type === 'earned' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {history.type === 'earned' ? 'Tích điểm' : 'Đổi điểm'}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-tea-medium">
                  <Award className="h-12 w-12 mx-auto mb-4 text-tea-medium/50" />
                  <p>Chưa có lịch sử điểm thưởng.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PointsPage;
