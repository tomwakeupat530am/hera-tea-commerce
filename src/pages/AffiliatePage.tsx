
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AffiliatePage = () => {
  return (
    <Layout>
      <div className="hero-pattern">
        <div className="container mx-auto px-4 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-tea-dark leading-tight mb-6">
            Chương trình <span className="text-primary">cộng tác viên</span>
          </h1>
          <p className="text-xl text-tea-medium max-w-3xl mx-auto">
            Chia sẻ tình yêu của bạn đối với trà thảo mộc Hera Tea và nhận hoa hồng hấp dẫn 35% cho mỗi đơn hàng từ mã giới thiệu của bạn
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-heading text-center mx-auto">Cách thức hoạt động</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-tea-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif font-medium text-tea-medium">1</span>
              </div>
              <h3 className="text-xl font-serif mb-2">Đăng ký</h3>
              <p className="text-tea-medium">Đăng ký tài khoản và đăng ký trở thành cộng tác viên với Hera Tea.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-tea-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif font-medium text-tea-medium">2</span>
              </div>
              <h3 className="text-xl font-serif mb-2">Chia sẻ</h3>
              <p className="text-tea-medium">Nhận mã giới thiệu duy nhất và chia sẻ với bạn bè, gia đình và người theo dõi của bạn.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-tea-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif font-medium text-tea-medium">3</span>
              </div>
              <h3 className="text-xl font-serif mb-2">Nhận hoa hồng</h3>
              <p className="text-tea-medium">Nhận 35% hoa hồng cho mỗi đơn hàng sử dụng mã giới thiệu của bạn.</p>
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="section-heading text-center mx-auto">Lợi ích khi trở thành cộng tác viên</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-tea-light rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tea-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-serif font-medium mb-2">Hoa hồng cao</h3>
                <p className="text-tea-medium">Nhận 35% hoa hồng cho mỗi đơn hàng sử dụng mã giới thiệu của bạn.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-tea-light rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tea-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-serif font-medium mb-2">Sản phẩm chất lượng</h3>
                <p className="text-tea-medium">Giới thiệu các sản phẩm trà thảo mộc chất lượng cao mà bạn có thể tin tưởng.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-tea-light rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tea-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-serif font-medium mb-2">Dễ dàng theo dõi</h3>
                <p className="text-tea-medium">Bảng điều khiển riêng để theo dõi đơn hàng, doanh số và hoa hồng của bạn.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-tea-light rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tea-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-serif font-medium mb-2">Thanh toán dễ dàng</h3>
                <p className="text-tea-medium">Thanh toán hoa hồng đơn giản thông qua chuyển khoản ngân hàng.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-3xl mx-auto text-center">
          <h2 className="section-heading text-center mx-auto">Câu hỏi thường gặp</h2>
          
          <div className="mt-12 text-left space-y-6">
            <div>
              <h3 className="text-lg font-serif font-medium mb-2">Ai có thể trở thành cộng tác viên?</h3>
              <p className="text-tea-medium">Bất kỳ ai cũng có thể đăng ký trở thành cộng tác viên của Hera Tea. Bạn chỉ cần là người yêu thích trà thảo mộc và muốn chia sẻ với mọi người.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-serif font-medium mb-2">Làm thế nào để đăng ký?</h3>
              <p className="text-tea-medium">Đăng ký tài khoản và chọn tùy chọn "Tôi muốn trở thành cộng tác viên" trong quá trình đăng ký. Sau đó, chúng tôi sẽ xét duyệt và kích hoạt tài khoản cộng tác viên của bạn.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-serif font-medium mb-2">Hoa hồng được tính như thế nào?</h3>
              <p className="text-tea-medium">Bạn sẽ nhận được 35% hoa hồng dựa trên giá trị đơn hàng (trước thuế và phí vận chuyển) khi khách hàng sử dụng mã giới thiệu của bạn.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-serif font-medium mb-2">Khi nào tôi nhận được hoa hồng?</h3>
              <p className="text-tea-medium">Hoa hồng sẽ được cập nhật vào tài khoản của bạn sau khi đơn hàng được giao thành công và hết thời gian đổi trả. Bạn có thể yêu cầu thanh toán hoa hồng khi đạt mức tối thiểu.</p>
            </div>
          </div>
        </div>

        <div className="mt-20 bg-tea-light p-8 md:p-12 rounded-lg max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-medium mb-6">Sẵn sàng bắt đầu?</h2>
          <p className="text-lg text-tea-medium mb-8">
            Đăng ký ngay hôm nay để trở thành cộng tác viên và bắt đầu kiếm hoa hồng với Hera Tea!
          </p>
          <Button asChild size="lg" className="btn-hover-effect">
            <Link to="/register">Đăng ký ngay</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default AffiliatePage;
