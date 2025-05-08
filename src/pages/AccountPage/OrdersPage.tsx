
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
import { formatPrice } from '@/utils/format';
import { Package } from 'lucide-react';
import AccountMenu from '@/components/Account/AccountMenu';

const OrdersPage = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Sample orders data (in a real app, this would come from an API call)
  const orders = [
    {
      id: 'ORD-1001',
      date: '2023-10-15',
      status: 'Đã giao hàng',
      total: 320000,
      items: 1
    },
    {
      id: 'ORD-1002',
      date: '2023-11-02',
      status: 'Đang giao hàng',
      total: 640000,
      items: 2
    },
    {
      id: 'ORD-1003',
      date: '2023-12-10',
      status: 'Đang xử lý',
      total: 960000,
      items: 3
    }
  ];

  return (
    <Layout>
      <div className="bg-tea-light py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">Đơn hàng của tôi</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <AccountMenu activePath="/account/orders" />

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg border border-tea-medium/20 shadow-sm">
              <div className="flex items-center mb-6">
                <Package className="h-6 w-6 mr-2 text-primary" />
                <h2 className="text-xl font-serif">Đơn hàng của tôi</h2>
              </div>

              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã đơn hàng</TableHead>
                        <TableHead>Ngày đặt</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Số SP</TableHead>
                        <TableHead>Tổng tiền</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Đã giao hàng' 
                                ? 'bg-green-100 text-green-800' 
                                : order.status === 'Đang giao hàng'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell>{formatPrice(order.total)}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Chi tiết
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-tea-medium">
                  <Package className="h-12 w-12 mx-auto mb-4 text-tea-medium/50" />
                  <p>Bạn chưa có đơn hàng nào.</p>
                  <Button asChild className="mt-4">
                    <Link to="/products">Mua sắm ngay</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrdersPage;
