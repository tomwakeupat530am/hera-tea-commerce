
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';

const AboutPage = () => {
  return (
    <Layout>
      <div className="bg-tea-light py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">Giới thiệu về Hera Tea</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-primary/10 p-3 rounded-full">
              <Info className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-serif text-center mb-8">Câu chuyện của chúng tôi</h2>
            
            <p>
              Hera Tea được thành lập với sứ mệnh mang đến những sản phẩm trà thảo mộc cao cấp, thuần tự nhiên 
              và tốt cho sức khỏe. Lấy cảm hứng từ nữ thần Hy Lạp Hera - biểu tượng của sự thuần khiết và 
              quyền năng, chúng tôi mong muốn mỗi sản phẩm của mình đều là hiện thân của sự tinh khiết, 
              thanh tao mà vẫn đầy sức sống.
            </p>

            <div className="my-8 flex justify-center">
              <img 
                src="/lovable-uploads/ecac73d7-b9ca-4c87-b5b0-68fca0e62302.png" 
                alt="Hera Tea Logo" 
                className="w-48 h-48 object-contain"
              />
            </div>

            <h3 className="text-xl font-serif mt-8">Cam kết của chúng tôi</h3>
            
            <p>
              Chúng tôi cam kết chỉ sử dụng những nguyên liệu thuần tự nhiên, được tuyển chọn kỹ lưỡng 
              từ những vùng trồng sạch nhất. Mỗi sản phẩm đều được sản xuất theo quy trình nghiêm ngặt, 
              đảm bảo giữ trọn vẹn dưỡng chất và hương vị tự nhiên của trà.
            </p>

            <p>
              Với ba dòng sản phẩm chủ lực - Thanh sắc mộc trà, An nguyệt mộc trà và Thái mộc mộc trà - 
              chúng tôi tự hào mang đến những trải nghiệm thưởng trà tinh tế, kết hợp giữa giá trị 
              truyền thống và nhu cầu hiện đại.
            </p>

            <h3 className="text-xl font-serif mt-8">Tầm nhìn</h3>
            
            <p>
              Hera Tea không chỉ mong muốn trở thành thương hiệu trà hàng đầu Việt Nam mà còn hướng đến 
              việc quảng bá văn hóa thưởng trà Việt Nam ra thế giới. Chúng tôi tin rằng, mỗi tách trà không 
              chỉ là thức uống mà còn là một nghệ thuật sống, một phương thức chăm sóc sức khỏe và tâm hồn.
            </p>

            <div className="mt-10 text-center">
              <Button asChild className="px-8">
                <Link to="/products">Khám phá sản phẩm</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
