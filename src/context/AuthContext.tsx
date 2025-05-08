
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, referralCode?: string, wantsToBeAffiliate?: boolean) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUser: User = {
  id: "user-1",
  name: "Khách hàng",
  email: "khach@example.com",
  isAffiliate: false,
  referralCode: "REF12345",
  points: 450,
  pointsHistory: [
    {
      id: "ph-1",
      points: 250,
      type: "earned",
      description: "Bạn bè sử dụng mã giới thiệu của bạn",
      date: "2023-05-10"
    },
    {
      id: "ph-2",
      points: 250,
      type: "earned",
      description: "Bạn bè sử dụng mã giới thiệu của bạn",
      date: "2023-06-15"
    },
    {
      id: "ph-3",
      points: 50,
      type: "redeemed",
      description: "Đổi điểm lấy voucher",
      date: "2023-07-01"
    }
  ],
  orders: []
};

// Mock affiliate user
const mockAffiliate: User = {
  id: "affiliate-1",
  name: "CTV Hera Tea",
  email: "ctv@example.com",
  isAffiliate: true,
  referralCode: "HERACT01",
  points: 750,
  affiliateCommission: 1750000,
  pointsHistory: [
    {
      id: "ph-1",
      points: 250,
      type: "earned",
      description: "Bạn bè sử dụng mã giới thiệu của bạn",
      date: "2023-05-10"
    },
    {
      id: "ph-2",
      points: 500,
      type: "earned",
      description: "Hoàn thành thử thách giới thiệu",
      date: "2023-06-15"
    }
  ],
  orders: []
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('heratea-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === "khach@example.com" && password === "password") {
          setUser(mockUser);
          localStorage.setItem('heratea-user', JSON.stringify(mockUser));
          setIsLoading(false);
          resolve(true);
        } else if (email === "ctv@example.com" && password === "password") {
          setUser(mockAffiliate);
          localStorage.setItem('heratea-user', JSON.stringify(mockAffiliate));
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('heratea-user');
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    referralCode?: string,
    wantsToBeAffiliate?: boolean
  ): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          isAffiliate: wantsToBeAffiliate ? false : false, // Initially false, needs approval
          referralCode: `REF${Math.floor(Math.random() * 90000) + 10000}`,
          points: 0,
          pointsHistory: [],
          orders: [],
          affiliateCommission: wantsToBeAffiliate ? 0 : undefined
        };
        
        setUser(newUser);
        localStorage.setItem('heratea-user', JSON.stringify(newUser));
        setIsLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      register, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
