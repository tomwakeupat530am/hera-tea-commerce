
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import CartDrawer from '@/components/Cart/CartDrawer';

const Navbar: React.FC = () => {
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-serif text-tea-dark font-bold">Hera Tea</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="nav-link">Trang chủ</Link>
              <Link to="/products" className="nav-link">Sản phẩm</Link>
              <Link to="/about" className="nav-link">Giới thiệu</Link>
              <Link to="/contact" className="nav-link">Liên hệ</Link>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSearch}
                className="p-2 rounded-full hover:bg-accent transition-colors duration-200"
              >
                <Search className="h-5 w-5 text-tea-dark" />
              </button>

              <Link to={isAuthenticated ? "/account" : "/login"} className="p-2 rounded-full hover:bg-accent transition-colors duration-200">
                <User className="h-5 w-5 text-tea-dark" />
              </Link>

              <button 
                className="p-2 rounded-full hover:bg-accent relative transition-colors duration-200"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5 text-tea-dark" />
                {totalItems > 0 && (
                  <span className="cart-bubble">{totalItems}</span>
                )}
              </button>

              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2 rounded-full hover:bg-accent transition-colors duration-200"
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-tea-dark" />
                ) : (
                  <Menu className="h-5 w-5 text-tea-dark" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-border animate-fade-in">
            <div className="container mx-auto py-4 px-4 flex flex-col space-y-3">
              <Link to="/" className="py-2 px-4 hover:bg-accent rounded-md" onClick={toggleMenu}>Trang chủ</Link>
              <Link to="/products" className="py-2 px-4 hover:bg-accent rounded-md" onClick={toggleMenu}>Sản phẩm</Link>
              <Link to="/about" className="py-2 px-4 hover:bg-accent rounded-md" onClick={toggleMenu}>Giới thiệu</Link>
              <Link to="/contact" className="py-2 px-4 hover:bg-accent rounded-md" onClick={toggleMenu}>Liên hệ</Link>
            </div>
          </div>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="bg-white border-t border-border py-4 animate-fade-in">
            <div className="container mx-auto px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full px-4 py-2 border border-border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-tea-medium" />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
