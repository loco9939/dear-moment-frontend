import { API_ENDPOINTS } from '../config';
import { handleApiError } from '../error';
import { post } from '../utils/http';
import { AddInquiryOptionResponse } from './types';

/**
 * 상품 옵션 문의 추가 API
 * @param productId 상품 ID
 * @param optionId 상품 옵션 ID
 * @returns API 응답
 */
export async function addInquiryOption({
  productId,
  optionId,
}: {
  productId: number;
  optionId: number;
}): Promise<AddInquiryOptionResponse> {
  try {
    const endpoint = API_ENDPOINTS.inquiries.options;
    return await post<AddInquiryOptionResponse>(endpoint, { productId, optionId });
  } catch (error) {
    console.error('상품 옵션 문의 추가 실패:', error);
    throw handleApiError(error);
  }
}
