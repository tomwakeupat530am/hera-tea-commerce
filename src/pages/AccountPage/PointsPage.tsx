
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Award, Gift } from 'lucide-react';
import AccountMenu from '@/components/Account/AccountMenu';
import { toast } from '@/components/ui/use-toast';

const PointsPage = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleRedeemPoints = () => {
    // This would typically make an API call to redeem points
    toast({
      title: "Đổi điểm thành công",
      description: "Bạn đã đổi 300 điểm để nhận một hộp trà miễn phí. Chúng tôi sẽ liên hệ với bạn để xác nhận."
    });
  };

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
            <div className="bg-white p-6 rounded-lg border border-tea-medium/20 shadow-sm">
              <div className="flex items-center mb-6">
                <Award className="h-6 w-6 mr-2 text-primary" />
                <h2 className="text-xl font-serif">Điểm thưởng của tôi</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-tea-light p-6 rounded-lg">
                  <p className="text-sm text-tea-medium">Tổng điểm hiện tại</p>
                  <p className="text-3xl font-medium">{user?.points}</p>
                </div>
                
                <div className="bg-tea-light p-6 rounded-lg">
                  <p className="text-sm text-tea-medium">Đổi điểm</p>
                  <div className="flex items-center justify-between mt-2">
                    <p>300 điểm = 1 hộp trà</p>
                    <Button 
                      disabled={!user || user.points < 300}
                      onClick={handleRedeemPoints}
                    >
                      Đổi ngay
                    </Button>
                  </div>
                  {(!user || user.points < 300) && (
                    <p className="text-sm text-tea-medium mt-2">
                      Bạn cần thêm {300 - (user?.points || 0)} điểm để đổi 1 hộp trà.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Cách kiếm điểm</h3>
                <div className="bg-tea-light rounded-lg p-4 mb-6">
                  <p className="mb-2">1. Giới thiệu bạn bè mua hàng bằng mã giới thiệu của bạn.</p>
                  <p className="mb-2">2. Khi bạn bè mua hàng từ 250k sử dụng mã của bạn, bạn sẽ nhận được 250 điểm.</p>
                  <p>3. Điểm thưởng không giới hạn số lần kiếm và không hết hạn.</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Lịch sử điểm thưởng</h3>
                
                {user?.pointsHistory && user.pointsHistory.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ngày</TableHead>
                          <TableHead>Loại</TableHead>
                          <TableHead>Điểm</TableHead>
                          <TableHead>Mô tả</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {user.pointsHistory.map((history) => (
                          <TableRow key={history.id}>
                            <TableCell>{history.date}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                history.type === 'earned' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {history.type === 'earned' ? 'Nhận điểm' : 'Đổi điểm'}
                              </span>
                            </TableCell>
                            <TableCell className={`font-medium ${
                              history.type === 'earned' ? 'text-green-600' : 'text-blue-600'
                            }`}>
                              {history.type === 'earned' ? '+' : '-'}{history.points}
                            </TableCell>
                            <TableCell>{history.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-tea-medium">
                    <Gift className="h-12 w-12 mx-auto mb-4 text-tea-medium/50" />
                    <p>Bạn chưa có lịch sử điểm thưởng nào.</p>
                    <p className="mt-2">Hãy giới thiệu bạn bè để nhận điểm nhé!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PointsPage;
