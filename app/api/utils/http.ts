// HTTP 요청 유틸리티 함수

import { API_CONFIG, createApiUrl } from '../config';
import { handleHttpError } from '../error';

/**
 * 기본 HTTP 요청 옵션
 */
export const defaultRequestOptions: RequestInit = {
  headers: API_CONFIG.headers,
  // 타임아웃 설정은 AbortController로 구현 가능
};

/**
 * 타임아웃 설정으로 AbortController 생성
 * @param timeout 타임아웃 시간 (ms)
 * @returns AbortController 인스턴스와 타임아웃 ID
 */
function createAbortController(timeout: number = API_CONFIG.timeout): {
  controller: AbortController;
  timeoutId: NodeJS.Timeout | number;
} {
  const controller = new AbortController();
  // 서버와 클라이언트 환경 모두에서 동작하도록 수정
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  return { controller, timeoutId };
}

/**
 * HTTP GET 요청 함수
 * @param endpoint API 엔드포인트
 * @param options 요청 옵션
 * @returns 응답 데이터
 */
export async function get<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = createApiUrl(endpoint);
  const { controller, timeoutId } = createAbortController();

  try {
    const response = await fetch(url, {
      method: 'GET',
      ...defaultRequestOptions,
      ...options,
      signal: controller.signal,
    });

    if (!response.ok) {
      return await handleHttpError(response);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`요청 타임아웃: ${url}`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * HTTP POST 요청 함수
 * @param endpoint API 엔드포인트
 * @param data 요청 데이터
 * @param options 요청 옵션
 * @returns 응답 데이터
 */
export async function post<T>(endpoint: string, data: unknown, options?: RequestInit): Promise<T> {
  const url = createApiUrl(endpoint);
  const { controller, timeoutId } = createAbortController();

  try {
    const response = await fetch(url, {
      method: 'POST',
      ...defaultRequestOptions,
      ...options,
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    if (!response.ok) {
      return await handleHttpError(response);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`요청 타임아웃: ${url}`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * HTTP PUT 요청 함수
 * @param endpoint API 엔드포인트
 * @param data 요청 데이터
 * @param options 요청 옵션
 * @returns 응답 데이터
 */
export async function put<T>(endpoint: string, data: unknown, options?: RequestInit): Promise<T> {
  const url = createApiUrl(endpoint);
  const { controller, timeoutId } = createAbortController();

  try {
    const response = await fetch(url, {
      method: 'PUT',
      ...defaultRequestOptions,
      ...options,
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    if (!response.ok) {
      return await handleHttpError(response);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`요청 타임아웃: ${url}`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * HTTP DELETE 요청 함수
 * @param endpoint API 엔드포인트
 * @param data 요청 데이터 (request body)
 * @param options 요청 옵션
 * @returns void - 반환값 없음
 */
export async function del(endpoint: string, data: unknown, options?: RequestInit): Promise<void> {
  const url = createApiUrl(endpoint);
  const { controller, timeoutId } = createAbortController();

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      ...defaultRequestOptions,
      ...options,
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw await handleHttpError(response);
    }

    // DELETE 요청은 성공 시 반환값 없음 (No Content 처리)
    return;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`요청 타임아웃: ${url}`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
