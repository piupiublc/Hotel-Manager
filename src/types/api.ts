// Define comprehensive types for the API interactions

export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface RegisterCustomerRequest {
  email?: string;
  password?: string;
  fullName?: string;
  phone?: string;
}

export interface RegisterPartnerRequest {
  email?: string;
  password?: string;
  fullName?: string;
  phone?: string;
}

export interface ChangePasswordRequest {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    role: string;
    fullName: string;
    avatar?: string;
  };
}

export interface Room {
  id: number;
  propertyId: number;
  name: string;
  roomCode: string;
  roomType?: string;
  capacity: number;
  bedCount?: number;
  basePrice: number;
  area?: number;
  description?: string;
  status?: string;
  isApproved?: boolean;
  createdAt?: string;
  updatedAt?: string;
  
  // Extended Fields from Join
  mainImageUrl?: string;
  imageUrls?: string[];
  propertyLocation?: string;
  fullAddress?: string;
  propertyName?: string;
  propertyDescription?: string;
  rating?: number;
}

export interface CreateRoomRequest {
  name: string;
  roomCode: string;
  description?: string;
  basePrice: number;
  capacity: number;
  propertyId: number;
  imageUrls?: string[];
}

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  cccd?: string;
  address?: string;
  avatar?: string;
  status: string;
  role: string;
  createdAt: string;
}

export interface UpdateProfileRequest {
  fullName: string;
  phone?: string;
  cccd?: string;
  address?: string;
  avatar?: string;
}

export interface UpdateRoomRequest extends Partial<CreateRoomRequest> {
  status?: string;
}

export interface Booking {
  id: number;
  roomId: number;
  roomName: string;
  roomCode: string;
  userId: number;
  userName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  pricePerNight: number;
  totalPrice: number;
  deposit?: number;
  status: string;
  roomImage?: string;
  createdAt?: string;
}

export interface CreateBookingRequest {
  roomId: number;
  checkIn: string;
  checkOut: string;
  guestCount?: number;
  note?: string;
  isDeposit?: boolean;
}

export interface RevenueResponse {
  totalRevenue: number;
}

export interface OccupancyRateResponse {
  percentage: number;
  totalRooms: number;
  bookedRooms: number;
}

export interface TopBookedRoomDto {
  roomId: number;
  roomName: string;
  bookingCount: number;
}

export interface FinanceTransactionDto {
  id: number;
  roomName: string;
  customerName: string;
  amount: number;
  date: string;
  status: string;
}

export interface BusinessFinanceSummary {
  totalEarnings: number;
  pendingPayouts: number;
  availableBalance: number;
  recentTransactions: FinanceTransactionDto[];
}

export interface AdminFinanceSummary {
  totalRevenue: number;
  totalPayouts: number;
  totalBookings: number;
  totalUsers: number;
  totalProperties: number;
  systemTransactions: FinanceTransactionDto[];
}

export interface Payout {
  id: number;
  partnerId: number;
  businessName?: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  status: string;
  proofImageUrl?: string;
  transactionId?: string;
  adminNote?: string;
  createdAt: string;
  updatedAt?: string;
  paidAt?: string;
}

export interface CreatePayoutRequest {
  amount: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface ProcessPayoutRequest {
  status: string;
  adminNote?: string;
  transactionId?: string;
  proofImageUrl?: string;
}

export interface RoomRecommendationDto {
  roomId: number;
  roomName: string;
  averageRating: number;
  bookingCount: number;
  score: number;
}
