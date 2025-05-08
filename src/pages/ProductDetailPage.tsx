
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Minus, Plus } from 'lucide-react';
import { products } from '@/data/products';
import { formatPrice } from '@/utils/format';
import { useCart } from '@/context/CartContext';
import ProductGrid from '@/components/Products/ProductGrid';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(products.find(p => p.id === id));
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    setProduct(products.find(p => p.id === id));
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-serif mb-6">Không tìm thấy sản phẩm</h1>
          <p className="mb-8 text-tea-medium">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Button asChild>
            <Link to="/products">Quay lại trang sản phẩm</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const incrementQuantity = () => {
    setQuantity(prev => (prev < product.stock ? prev + 1 : prev));
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  // Related products - exclude current product
  const relatedProducts = products
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="aspect-square overflow-hidden rounded-lg bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2">
            <div className="text-sm breadcrumbs mb-4 text-tea-medium">
              <ul className="flex space-x-2">
                <li><Link to="/" className="hover:underline">Trang chủ</Link> /</li>
                <li><Link to="/products" className="hover:underline">Sản phẩm</Link> /</li>
                <li>{product.name}</li>
              </ul>
            </div>

            <h1 className="text-3xl font-serif font-medium mb-4">{product.name}</h1>

            <div className="text-2xl font-medium mb-6">{formatPrice(product.price)}</div>

            <div className="mb-6">{product.description}</div>

            {product.detailDescription && (
              <div className="mb-6 text-tea-medium">{product.detailDescription}</div>
            )}

            <div className="mb-4">
              <span className="font-medium">Khối lượng:</span> {product.weight}
            </div>

            {product.ingredients && (
              <div className="mb-6">
                <span className="font-medium">Thành phần:</span> {product.ingredients}
              </div>
            )}

            <div className="mb-6">
              <span className="font-medium">Tình trạng:</span>{" "}
              {product.stock > 0 ? (
                <span className="text-green-600">Còn hàng ({product.stock})</span>
              ) : (
                <span className="text-destructive">Hết hàng</span>
              )}
            </div>

            {/* Quantity selector */}
            <div className="flex items-center mb-6">
              <span className="font-medium mr-4">Số lượng:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  disabled={quantity === 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to cart button */}
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full py-6 btn-hover-effect"
              size="lg"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              {product.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
            </Button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-serif font-medium mb-8">Sản phẩm liên quan</h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
