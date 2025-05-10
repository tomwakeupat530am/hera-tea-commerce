
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ProductGrid from '@/components/Products/ProductGrid';
import { products } from '@/data/products';

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-pattern">
        <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-tea-dark leading-tight">
              Khám phá hương vị <br />
              <span className="text-primary">thuần khiết</span> từ thiên nhiên
            </h1>
            <p className="mt-6 text-lg text-tea-medium">
              Thả mình vào thế giới trà thảo mộc tinh khiết với Hera Tea, nơi mỗi tách trà là một hành trình khám phá hương vị tinh tế.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="btn-hover-effect">
                <Link to="/products">Khám phá sản phẩm</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-hover-effect">
                <Link to="/about">Tìm hiểu thêm</Link>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img 
              src="https://images.unsplash.com/photo-1563911892437-1feda0179e1b?q=80&w=1470&auto=format&fit=crop" 
              alt="Hera Tea Premium Collection" 
              className="rounded-lg shadow-lg max-w-md w-full"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-heading text-center mx-auto">Trải nghiệm với Hera Tea</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center p-6 border border-tea-medium/20 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-tea-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tea-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-serif mb-2">Nguồn gốc tự nhiên</h3>
              <p className="text-tea-medium">Nguyên liệu được chọn lọc kỹ lưỡng từ những vùng trồng tự nhiên tốt nhất.</p>
            </div>
            
            <div className="text-center p-6 border border-tea-medium/20 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-tea-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tea-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif mb-2">Chất lượng cao cấp</h3>
              <p className="text-tea-medium">Quy trình chế biến nghiêm ngặt đảm bảo chất lượng vượt trội cho từng sản phẩm.</p>
            </div>
            
            <div className="text-center p-6 border border-tea-medium/20 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-tea-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tea-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif mb-2">Lợi ích sức khỏe</h3>
              <p className="text-tea-medium">Trà thảo mộc của chúng tôi không chỉ có hương vị tuyệt vời mà còn mang lại nhiều lợi ích cho sức khỏe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-tea-light py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-heading text-center mx-auto">Sản phẩm nổi bật</h2>
          
          <ProductGrid products={products} />
          
          <div className="text-center mt-12">
            <Button asChild size="lg" className="btn-hover-effect">
              <Link to="/products">Xem tất cả sản phẩm</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-tea-medium text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">Trở thành cộng tác viên với Hera Tea</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Hãy tham gia cùng chúng tôi để chia sẻ hương vị tuyệt vời của trà thảo mộc Hera Tea và nhận hoa hồng hấp dẫn 35% cho mỗi đơn hàng thông qua mã giới thiệu của bạn.
          </p>
          <Button asChild size="lg" className="bg-white text-tea-dark hover:bg-tea-light btn-hover-effect">
            <Link to="/affiliate">Tìm hiểu thêm</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
