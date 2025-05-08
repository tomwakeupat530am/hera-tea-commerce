
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { RotateCcw } from 'lucide-react';

const ReturnsPage = () => {
  return (
    <Layout>
      <div className="bg-tea-light py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">Chính sách đổi trả</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-primary/10 p-3 rounded-full">
              <RotateCcw className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p>
              Tại Hera Tea, chúng tôi cam kết mang đến cho quý khách hàng sự hài lòng tuyệt đối với sản phẩm của mình. 
              Vì vậy, chúng tôi xây dựng chính sách đổi trả minh bạch và công bằng để bảo vệ quyền lợi khách hàng.
            </p>

            <h2>1. Điều kiện đổi trả</h2>
            <ul>
              <li>Sản phẩm còn nguyên vẹn, chưa được mở hoặc sử dụng.</li>
              <li>Còn nguyên bao bì, tem nhãn, phụ kiện đi kèm.</li>
              <li>Có hóa đơn mua hàng hoặc phiếu giao hàng.</li>
              <li>Thời gian đổi trả trong vòng 7 ngày kể từ ngày nhận hàng.</li>
            </ul>

            <h2>2. Các trường hợp được đổi trả</h2>
            <ul>
              <li>Sản phẩm bị lỗi do nhà sản xuất.</li>
              <li>Sản phẩm không đúng mẫu mã, loại sản phẩm như đơn đặt hàng.</li>
              <li>Sản phẩm không đảm bảo chất lượng như cam kết.</li>
              <li>Sản phẩm bị hư hỏng trong quá trình vận chuyển.</li>
            </ul>

            <h2>3. Quy trình đổi trả</h2>
            <ol>
              <li>
                <strong>Thông báo:</strong> Khách hàng liên hệ với Hera Tea qua số điện thoại 0968945406 hoặc email 
                minhnguyentuan31103@gmail.com để thông báo về việc đổi/trả sản phẩm.
              </li>
              <li>
                <strong>Xác nhận:</strong> Nhân viên chăm sóc khách hàng sẽ xác nhận thông tin và hướng dẫn quy trình đổi/trả.
              </li>
              <li>
                <strong>Gửi trả sản phẩm:</strong> Khách hàng gửi sản phẩm cần đổi/trả về địa chỉ của Hera Tea theo hướng dẫn.
              </li>
              <li>
                <strong>Kiểm tra và xử lý:</strong> Hera Tea sẽ kiểm tra sản phẩm và tiến hành đổi sản phẩm mới hoặc hoàn tiền 
                trong vòng 3-5 ngày làm việc kể từ khi nhận được sản phẩm trả lại.
              </li>
            </ol>

            <h2>4. Phương thức hoàn tiền</h2>
            <ul>
              <li>Đối với thanh toán chuyển khoản/thẻ: Hoàn tiền vào tài khoản ngân hàng của khách hàng.</li>
              <li>Đối với thanh toán khi nhận hàng (COD): Chuyển khoản theo thông tin khách hàng cung cấp.</li>
            </ul>

            <h2>5. Lưu ý</h2>
            <ul>
              <li>Chi phí vận chuyển cho việc đổi/trả sẽ do Hera Tea chi trả trong trường hợp sản phẩm bị lỗi.</li>
              <li>Trong trường hợp đổi/trả vì lý do cá nhân của khách hàng, chi phí vận chuyển sẽ do khách hàng chi trả.</li>
              <li>Hera Tea có quyền từ chối đổi/trả nếu sản phẩm không đáp ứng các điều kiện nêu trên.</li>
            </ul>

            <p>
              Mọi thắc mắc về chính sách đổi trả, vui lòng liên hệ với chúng tôi qua số điện thoại 0968945406
              hoặc email minhnguyentuan31103@gmail.com để được hỗ trợ.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReturnsPage;
