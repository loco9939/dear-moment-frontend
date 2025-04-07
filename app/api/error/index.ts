// API 에러 처리 중앙화

import { ApiError } from '../common/types';

/**
 * API 에러 클래스
 */
export class ApiErrorImpl extends Error implements ApiError {
  code: string;
  details?: Record<string, unknown>;

  constructor(message: string, code: string = 'UNKNOWN_ERROR', details?: Record<string, unknown>) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
  }
}

/**
 * HTTP 상태 코드에 따른 에러 코드 매핑
 */
export const HTTP_ERROR_CODES: Record<number, string> = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  422: 'VALIDATION_ERROR',
  429: 'TOO_MANY_REQUESTS',
  500: 'INTERNAL_SERVER_ERROR',
  502: 'BAD_GATEWAY',
  503: 'SERVICE_UNAVAILABLE',
  504: 'GATEWAY_TIMEOUT',
};

/**
 * HTTP 응답에서 에러 메시지 추출
 * @param response Fetch API 응답 객체
 * @returns 에러 메시지
 */
export async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json();
    return data.message || data.error || `${response.status} ${response.statusText}`;
  } catch (e) {
    return `${response.status} ${response.statusText} ${e}`;
  }
}

/**
 * HTTP 에러 처리 함수
 * @param response Fetch API 응답 객체
 */
export async function handleHttpError(response: Response): Promise<never> {
  const statusCode = response.status;
  const message = await extractErrorMessage(response);
  const code = HTTP_ERROR_CODES[statusCode] || 'UNKNOWN_ERROR';

  throw new ApiErrorImpl(message, code, {
    status: statusCode,
    statusText: response.statusText,
  });
}

/**
 * 일반 에러를 API 에러로 변환
 * @param error 원본 에러
 * @returns API 에러
 */
export function handleApiError(error: unknown): ApiErrorImpl {
  if (error instanceof ApiErrorImpl) {
    return error;
  }

  if (error instanceof Error) {
    return new ApiErrorImpl(error.message);
  }

  return new ApiErrorImpl('알 수 없는 에러가 발생했습니다.');
}
