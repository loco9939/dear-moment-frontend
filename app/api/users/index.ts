import { ApiResponse } from '../common/types';
import { API_ENDPOINTS } from '../config';
import { handleApiError } from '../error';
import { get, patch } from '../utils/http';
import { patchUserReq, UserRes } from './types';

/**
 * 사용자 프로필 조회 API
 * @returns 사용자 정보
 */
export async function getUser(): Promise<ApiResponse<UserRes>> {
  try {
    const endpoint = `${API_ENDPOINTS.users}`;
    return await get<ApiResponse<UserRes>>(endpoint);
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    throw handleApiError(error);
  }
}

/**
 * 사용자 프로필 수정 API
 * @param data 사용자 정보
 * @returns 수정된 사용자 정보
 */
export async function patchUser(data: patchUserReq): Promise<ApiResponse<UserRes>> {
  try {
    const endpoint = `${API_ENDPOINTS.users}`;
    return await patch<ApiResponse<UserRes>>(endpoint, data);
  } catch (error) {
    console.error('사용자 정보 수정 실패:', error);
    throw handleApiError(error);
  }
}
