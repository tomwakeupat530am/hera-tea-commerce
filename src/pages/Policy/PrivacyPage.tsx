
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Shield } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <Layout>
      <div className="bg-tea-light py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">Chính sách bảo mật</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-primary/10 p-3 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p>
              Tại Hera Tea, chúng tôi coi trọng sự tin tưởng của khách hàng và cam kết bảo vệ thông tin cá nhân của bạn. 
              Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.
            </p>

            <h2>1. Thông tin chúng tôi thu thập</h2>
            <p>Khi bạn sử dụng trang web hoặc dịch vụ của chúng tôi, chúng tôi có thể thu thập các loại thông tin sau:</p>
            <ul>
              <li><strong>Thông tin cá nhân:</strong> Họ tên, địa chỉ email, số điện thoại, địa chỉ giao hàng, thông tin thanh toán.</li>
              <li><strong>Thông tin tài khoản:</strong> Tên đăng nhập, mật khẩu, mã giới thiệu, lịch sử mua hàng, điểm thưởng.</li>
              <li><strong>Thông tin tự động:</strong> Dữ liệu về thiết bị, địa chỉ IP, loại trình duyệt, hành vi truy cập trang web.</li>
            </ul>

            <h2>2. Mục đích sử dụng thông tin</h2>
            <p>Chúng tôi sử dụng thông tin của bạn cho các mục đích sau:</p>
            <ul>
              <li>Xử lý đơn hàng và giao hàng.</li>
              <li>Quản lý tài khoản và chương trình khách hàng thân thiết.</li>
              <li>Cung cấp hỗ trợ khách hàng.</li>
              <li>Gửi thông báo về sản phẩm, dịch vụ và khuyến mãi.</li>
              <li>Cải thiện sản phẩm và dịch vụ của chúng tôi.</li>
              <li>Phân tích xu hướng và hành vi người dùng.</li>
              <li>Bảo vệ an ninh và phòng chống gian lận.</li>
            </ul>

            <h2>3. Chia sẻ thông tin</h2>
            <p>Chúng tôi có thể chia sẻ thông tin của bạn với:</p>
            <ul>
              <li><strong>Đối tác vận chuyển:</strong> Để giao hàng đến địa chỉ của bạn.</li>
              <li><strong>Đối tác thanh toán:</strong> Để xử lý giao dịch thanh toán.</li>
              <li><strong>Nhà cung cấp dịch vụ:</strong> Hỗ trợ chúng tôi trong các hoạt động kinh doanh (email marketing, phân tích dữ liệu, hỗ trợ khách hàng).</li>
              <li><strong>Cơ quan pháp luật:</strong> Khi có yêu cầu hợp pháp hoặc để bảo vệ quyền lợi của chúng tôi.</li>
            </ul>
            <p>Chúng tôi cam kết không bán, trao đổi hoặc chuyển giao thông tin cá nhân của bạn cho bên thứ ba ngoài những trường hợp nêu trên.</p>

            <h2>4. Bảo mật thông tin</h2>
            <p>Chúng tôi áp dụng các biện pháp bảo mật phù hợp để bảo vệ thông tin của bạn:</p>
            <ul>
              <li>Sử dụng giao thức SSL để mã hóa thông tin truyền tải.</li>
              <li>Giới hạn quyền truy cập vào thông tin cá nhân.</li>
              <li>Thường xuyên cập nhật các biện pháp bảo mật.</li>
              <li>Lưu trữ thông tin thanh toán an toàn theo tiêu chuẩn ngành.</li>
            </ul>

            <h2>5. Quyền của bạn</h2>
            <p>Bạn có quyền:</p>
            <ul>
              <li>Truy cập, sửa đổi hoặc xóa thông tin cá nhân của mình.</li>
              <li>Hạn chế hoặc phản đối việc xử lý thông tin của bạn.</li>
              <li>Nhận bản sao thông tin của bạn.</li>
              <li>Rút lại sự đồng ý cho việc sử dụng thông tin của bạn.</li>
              <li>Khiếu nại với cơ quan bảo vệ dữ liệu nếu bạn cho rằng quyền của mình bị vi phạm.</li>
            </ul>

            <h2>6. Cookies và công nghệ theo dõi</h2>
            <p>
              Chúng tôi sử dụng cookies và các công nghệ tương tự để cải thiện trải nghiệm của bạn trên trang web của chúng tôi. 
              Bạn có thể kiểm soát cài đặt cookies trong trình duyệt của mình.
            </p>

            <h2>7. Thay đổi chính sách</h2>
            <p>
              Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Bất kỳ thay đổi nào sẽ được đăng trên trang này 
              và, nếu đáng kể, chúng tôi sẽ thông báo cho bạn qua email.
            </p>

            <p>
              Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật của chúng tôi, vui lòng liên hệ qua email 
              minhnguyentuan31103@gmail.com hoặc số điện thoại 0968945406.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
