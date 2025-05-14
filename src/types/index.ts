
// Define or extend the User type if it doesn't exist yet
export interface User {
  id: string;
  name: string;
  email: string;
  isAffiliate?: boolean;
  referralCode?: string;
  points?: number;
  affiliateCommission?: number;
  phone?: string; // Added the missing phone property
}
