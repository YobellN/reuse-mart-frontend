export type IResponse<T> = {
  message: string;
  data?: T;
  errors?: Record<string, string>;
};

