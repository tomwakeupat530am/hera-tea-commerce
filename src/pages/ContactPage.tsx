
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <Layout>
      <div className="bg-tea-light py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">Liên hệ với chúng tôi</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Thông tin liên hệ */}
          <div>
            <h2 className="text-2xl font-serif mb-6">Thông tin liên hệ</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a href="mailto:minhnguyentuan31103@gmail.com" className="text-tea-medium hover:text-primary">
                    minhnguyentuan31103@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Điện thoại</h3>
                  <a href="tel:0968945406" className="text-tea-medium hover:text-primary">
                    0968945406
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Địa chỉ</h3>
                  <p className="text-tea-medium">
                    Kim Giang, Thanh Xuân, Hà Nội
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-serif mb-4">Giờ làm việc</h3>
              <p className="text-tea-medium">Thứ Hai - Thứ Sáu: 8:30 - 17:30</p>
              <p className="text-tea-medium">Thứ Bảy: 8:30 - 12:00</p>
              <p className="text-tea-medium">Chủ Nhật: Nghỉ</p>
            </div>
            
            <div className="mt-10">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                alt="Hera Tea - Không gian làm việc"
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
          
          {/* Form liên hệ */}
          <div>
            <h2 className="text-2xl font-serif mb-6">Gửi tin nhắn cho chúng tôi</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Họ và tên
                  </label>
                  <Input id="name" placeholder="Nhập họ và tên của bạn" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Nhập email của bạn" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium">
                  Tiêu đề
                </label>
                <Input id="subject" placeholder="Nhập tiêu đề tin nhắn" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Nội dung
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Nhập nội dung tin nhắn của bạn" 
                  rows={6}
                />
              </div>
              
              <Button type="submit" className="w-full md:w-auto px-8">
                Gửi tin nhắn
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
