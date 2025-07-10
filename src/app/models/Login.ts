export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
}

export interface User {
  id: number;
  document_number: string;
  document_type: string;
  email: string;
  name: string;
  phone: string;
  type: string;
}
