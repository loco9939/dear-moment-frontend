// 공통 API 타입 정의

// 페이지네이션 응답 형식 정의
export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// API 응답 기본 형식
export interface ApiResponse<T> {
  success: boolean;
  code: number;
  data: T;
  message?: string;
}

// API 에러 타입
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
