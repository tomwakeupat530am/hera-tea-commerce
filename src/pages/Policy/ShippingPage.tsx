
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Truck } from 'lucide-react';

const ShippingPage = () => {
  return (
    <Layout>
      <div className="bg-tea-light py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">Chính sách vận chuyển</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-primary/10 p-3 rounded-full">
              <Truck className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p>
              Hera Tea luôn nỗ lực để đảm bảo sản phẩm đến tay khách hàng một cách nhanh chóng và an toàn nhất. 
              Chúng tôi hợp tác với các đơn vị vận chuyển uy tín để mang đến dịch vụ giao hàng chất lượng.
            </p>

            <h2>1. Phạm vi giao hàng</h2>
            <ul>
              <li>Giao hàng trên toàn quốc.</li>
              <li>Đối với khu vực nội thành Hà Nội: Giao hàng trong ngày hoặc ngày hôm sau.</li>
              <li>Đối với các tỉnh thành khác: Thời gian giao hàng từ 2-5 ngày tùy khu vực.</li>
            </ul>

            <h2>2. Phí vận chuyển</h2>
            <ul>
              <li>Miễn phí vận chuyển cho đơn hàng từ 500.000đ trở lên.</li>
              <li>Đơn hàng dưới 500.000đ:
                <ul>
                  <li>Nội thành Hà Nội: 20.000đ</li>
                  <li>Các tỉnh thành khác: 30.000đ - 40.000đ tùy khu vực</li>
                </ul>
              </li>
              <li>Phí vận chuyển có thể thay đổi tùy theo khối lượng và kích thước đơn hàng.</li>
            </ul>

            <h2>3. Thời gian giao hàng</h2>
            <ul>
              <li>Đơn hàng sẽ được xử lý trong vòng 24 giờ sau khi đặt hàng (không tính ngày nghỉ, lễ).</li>
              <li>Thời gian giao hàng ước tính:
                <ul>
                  <li>Nội thành Hà Nội: 1-2 ngày</li>
                  <li>Các thành phố lớn (TP.HCM, Đà Nẵng...): 2-3 ngày</li>
                  <li>Các tỉnh thành khác: 3-5 ngày</li>
                  <li>Vùng sâu, vùng xa: 5-7 ngày</li>
                </ul>
              </li>
              <li>Trong một số trường hợp, thời gian giao hàng có thể bị ảnh hưởng bởi điều kiện thời tiết, giao thông hoặc các sự kiện bất khả kháng khác.</li>
            </ul>

            <h2>4. Theo dõi đơn hàng</h2>
            <ul>
              <li>Khách hàng sẽ nhận được mã vận đơn qua email sau khi đơn hàng được giao cho đơn vị vận chuyển.</li>
              <li>Khách hàng có thể theo dõi trạng thái đơn hàng trong tài khoản cá nhân hoặc liên hệ với Hera Tea để được hỗ trợ.</li>
            </ul>

            <h2>5. Quy định nhận hàng</h2>
            <ul>
              <li>Khách hàng vui lòng kiểm tra kỹ sản phẩm trước khi nhận hàng và thanh toán.</li>
              <li>Trường hợp phát hiện sản phẩm bị hư hỏng, không đúng mẫu mã, khách hàng có quyền từ chối nhận và thông báo ngay cho Hera Tea.</li>
              <li>Sau khi đã nhận và ký xác nhận, mọi khiếu nại về tình trạng bên ngoài của sản phẩm sẽ không được giải quyết.</li>
            </ul>

            <h2>6. Chính sách giao hàng không thành công</h2>
            <p>
              Trong trường hợp giao hàng không thành công do khách hàng cung cấp thông tin sai, vắng nhà, từ chối nhận hàng 
              hoặc các lý do khác từ phía khách hàng:
            </p>
            <ul>
              <li>Đơn vị vận chuyển sẽ liên hệ lại và sắp xếp giao hàng lần 2.</li>
              <li>Nếu giao hàng lần 2 không thành công, đơn hàng sẽ được hoàn về Hera Tea.</li>
              <li>Khách hàng sẽ chịu chi phí vận chuyển 2 chiều nếu muốn đặt hàng lại.</li>
            </ul>

            <p>
              Mọi thắc mắc về chính sách vận chuyển, vui lòng liên hệ với chúng tôi qua số điện thoại 0968945406
              hoặc email minhnguyentuan31103@gmail.com để được hỗ trợ.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPage;
