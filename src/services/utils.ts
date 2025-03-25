export type ApiResponse = {
    message: string;
    data?: any;
    errors?: Record<string, string>;
  };