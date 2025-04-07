import { API_ENDPOINTS } from '../config';
import { handleApiError } from '../error';
import { del, post } from '../utils/http';
import { AddLikeResponse, RemoveLikeRequest, RemoveLikeResponse } from './types';

/**
 * 상품 좋아요 추가 API
 * @param targetId 좋아요 대상 ID (상품 ID)
 * @returns API 응답
 */
export async function addProductLike(targetId: number): Promise<AddLikeResponse> {
  try {
    const endpoint = API_ENDPOINTS.likes.products;
    return await post<AddLikeResponse>(endpoint, { targetId });
  } catch (error) {
    console.error('좋아요 추가 실패:', error);
    throw handleApiError(error);
  }
}

/**
 * 상품 좋아요 삭제 API
 * @param likeId 좋아요 ID
 * @param productId 상품 ID
 */
export async function removeProductLike({ likeId, productId }: RemoveLikeRequest) {
  try {
    const endpoint = API_ENDPOINTS.likes.products;
    return await del(endpoint, { likeId, productId });
  } catch (error) {
    console.error('좋아요 삭제 실패:', error);
    throw handleApiError(error);
  }
}

/**
 * 상품 옵션 좋아요 추가 API
 * @param targetId 좋아요 대상 ID (상품 옵션 ID)
 * @returns API 응답
 */
export async function addOptionLike(targetId: number): Promise<RemoveLikeResponse> {
  try {
    const endpoint = API_ENDPOINTS.likes.options;
    return await post<RemoveLikeResponse>(endpoint, { targetId });
  } catch (error) {
    console.error('상품 옵션 좋아요 추가 실패:', error);
    throw handleApiError(error);
  }
}

/**
 * 상품 옵션 좋아요 삭제 API
 * @param likeId 좋아요 ID
 * @param optionId 상품 옵션 ID
 */
export async function removeOptionLike({ likeId, optionId }: { likeId: number; optionId: number }) {
  try {
    const endpoint = API_ENDPOINTS.likes.options;
    return await del(endpoint, { likeId, productOptionId: optionId });
  } catch (error) {
    console.error('상품 옵션 좋아요 삭제 실패:', error);
    throw handleApiError(error);
  }
}
