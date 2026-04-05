import { fetchClient } from '@/lib/api-client';
import { 
  LoginRequest, 
  RegisterCustomerRequest, 
  RegisterPartnerRequest, 
  AuthResponse,
  ChangePasswordRequest
} from '@/types/api';

export const AuthService = {
  /**
   * Updates user password
   */
  async changePassword(data: ChangePasswordRequest) {
    return await fetchClient<{message: string}>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Registers a new customer
   */
  async registerCustomer(data: RegisterCustomerRequest) {
    const response = await fetchClient<AuthResponse>('/auth/register/customer', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // In many systems, register auto-logs in. If it returns a token user, save it.
    if (response?.token) localStorage.setItem('access_token', response.token);
    if (response?.user) localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  },

  /**
   * Registers a new partner
   */
  async registerPartner(data: RegisterPartnerRequest) {
    const response = await fetchClient<AuthResponse>('/auth/register/partner', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response?.token) localStorage.setItem('access_token', response.token);
    if (response?.user) localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  },

  /**
   * Authenticates a user and returns their token alongside basic info
   */
  async login(data: LoginRequest) {
    const response = await fetchClient<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Optionally automatically store token upon login in client wrapper 
    // Usually state management like Context/Redux does this, but this is a handy fallback.
    if (typeof window !== 'undefined' && response?.token) {
      localStorage.setItem('access_token', response.token);
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    }
    
    return response;
  },

  /**
   * Convenience method to log out users 
   */
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      // Additional cleanup can be done here.
    }
  }
};
