export interface ApiSuccess<T> {
  status: "success";
  code: number;
  message: string;
  data: T;
}

export interface ApiFail {
  status: "fail";
  code: number;
  message: string;
}

export interface ApiErrorResponse {
  status: "error";
  code: number;
  message: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFail | ApiErrorResponse;

export interface ApiError {
  code: number;
  message: string;
}
