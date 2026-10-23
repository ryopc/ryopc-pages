export interface TurnstileResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
  action?: string;
  cdata?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  category: string;
  message: string;
}