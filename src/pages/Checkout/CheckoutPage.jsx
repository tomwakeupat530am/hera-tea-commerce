
import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { useCart } from '@/context/CartContext';
import CheckoutForm from '@/components/CheckoutForm';
import OrderSummary from '@/components/OrderSummary';

const CheckoutPage = () => {
  const { cart } = useCart();

  // Redirect to cart if cart is empty
  if (cart.length === 0) {
    return <Navigate to="/cart" />;
  }

  return (
    <Layout>
      <div className="bg-tea-light py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">Thanh toán</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <CheckoutForm />
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
