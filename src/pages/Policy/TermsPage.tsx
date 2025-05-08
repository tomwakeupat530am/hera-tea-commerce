
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { FileText } from 'lucide-react';

const TermsPage = () => {
  return (
    <Layout>
      <div className="bg-tea-light py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">Điều khoản sử dụng</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-primary/10 p-3 rounded-full">
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p>
              Chào mừng bạn đến với Hera Tea. Vui lòng đọc kỹ các điều khoản sử dụng này trước khi truy cập hoặc 
              sử dụng trang web của chúng tôi. Khi sử dụng trang web này, bạn đồng ý tuân thủ các điều khoản và điều kiện sau đây.
            </p>

            <h2>1. Điều khoản chung</h2>
            <ul>
              <li>Bằng việc truy cập và sử dụng trang web của Hera Tea, bạn đồng ý tuân thủ các điều khoản này.</li>
              <li>Nếu bạn không đồng ý với bất kỳ phần nào của điều khoản này, vui lòng không sử dụng trang web của chúng tôi.</li>
              <li>Chúng tôi có quyền sửa đổi, cập nhật hoặc thay đổi các điều khoản này vào bất kỳ lúc nào mà không cần thông báo trước.</li>
            </ul>

            <h2>2. Tài khoản người dùng</h2>
            <ul>
              <li>Khi tạo tài khoản trên trang web của chúng tôi, bạn phải cung cấp thông tin chính xác, đầy đủ và cập nhật.</li>
              <li>Bạn chịu trách nhiệm bảo mật tài khoản của mình, bao gồm mật khẩu và mọi hoạt động diễn ra thông qua tài khoản của bạn.</li>
              <li>Chúng tôi có quyền đình chỉ hoặc chấm dứt tài khoản của bạn nếu phát hiện vi phạm điều khoản sử dụng hoặc có hành vi gian lận.</li>
            </ul>

            <h2>3. Sản phẩm và giao dịch</h2>
            <ul>
              <li>Mọi thông tin về sản phẩm, giá cả được hiển thị trên trang web của chúng tôi đều chính xác tại thời điểm đăng tải.</li>
              <li>Chúng tôi có quyền thay đổi giá cả, khuyến mãi và thông tin sản phẩm mà không cần thông báo trước.</li>
              <li>Mọi giao dịch đều tuân theo chính sách giá, thanh toán và vận chuyển được quy định cụ thể trên trang web.</li>
              <li>Chúng tôi có quyền từ chối hoặc hủy đơn hàng vì bất kỳ lý do gì, bao gồm cả lỗi về giá hoặc thông tin sản phẩm.</li>
            </ul>

            <h2>4. Chương trình tích điểm và affiliate</h2>
            <ul>
              <li>Việc tham gia chương trình tích điểm và affiliate của chúng tôi tuân theo các điều khoản và điều kiện riêng được quy định cụ thể.</li>
              <li>Chúng tôi có quyền thay đổi, đình chỉ hoặc chấm dứt các chương trình này vào bất kỳ lúc nào.</li>
              <li>Mọi hành vi gian lận trong việc tích điểm hoặc thực hiện chương trình affiliate sẽ dẫn đến việc hủy bỏ quyền lợi và có thể chấm dứt tài khoản.</li>
            </ul>

            <h2>5. Quyền sở hữu trí tuệ</h2>
            <ul>
              <li>Tất cả nội dung trên trang web của Hera Tea, bao gồm văn bản, hình ảnh, logo, thiết kế, giao diện người dùng đều thuộc quyền sở hữu của chúng tôi.</li>
              <li>Bạn không được sao chép, phân phối, sửa đổi hoặc tạo các tác phẩm phái sinh từ bất kỳ nội dung nào trên trang web mà không có sự cho phép bằng văn bản của chúng tôi.</li>
              <li>Bạn có thể chia sẻ liên kết đến trang web của chúng tôi cho mục đích phi thương mại.</li>
            </ul>

            <h2>6. Giới hạn trách nhiệm</h2>
            <ul>
              <li>Chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên hoặc đặc biệt phát sinh từ việc sử dụng hoặc không thể sử dụng trang web của chúng tôi.</li>
              <li>Trang web có thể chứa liên kết đến các trang web của bên thứ ba. Chúng tôi không chịu trách nhiệm về nội dung, chính sách bảo mật hoặc hoạt động của các trang web này.</li>
            </ul>

            <h2>7. Luật áp dụng và giải quyết tranh chấp</h2>
            <ul>
              <li>Các điều khoản này được điều chỉnh và giải thích theo luật pháp Việt Nam.</li>
              <li>Mọi tranh chấp phát sinh liên quan đến việc sử dụng trang web sẽ được giải quyết thông qua thương lượng hoặc tại tòa án có thẩm quyền tại Việt Nam.</li>
            </ul>

            <p>
              Nếu bạn có bất kỳ câu hỏi nào về các điều khoản sử dụng, vui lòng liên hệ với chúng tôi qua email 
              minhnguyentuan31103@gmail.com hoặc số điện thoại 0968945406.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
