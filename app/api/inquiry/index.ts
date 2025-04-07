import { ApiResponse } from '../common/types';
import { API_ENDPOINTS } from '../config';
import { handleApiError } from '../error';
import { del, get, post } from '../utils/http';
import { InquiryListResponse, InquiryServiceReq, InquiryStudioListResponse, InquiryStudioReq } from './types';

/**
 * 상품 옵션 문의 목록을 가져오는 API
 * @param page 페이지 번호 (0부터 시작)
 * @param size 페이지 크기
 * @returns 페이지네이션된 상품 옵션 문의 목록
 */
export async function fetchInquiryList(page: number = 0, size: number = 10): Promise<InquiryListResponse> {
  try {
    const endpoint = `${API_ENDPOINTS.inquiry.options}?page=${page}&size=${size}`;
    return await get<InquiryListResponse>(endpoint);
  } catch (error) {
    console.error('상품 옵션 문의 목록 가져오기 실패:', error);
    throw handleApiError(error);
  }
}

/**
 * 작가 정보 오류 제보 목록을 가져오는 API
 * @param page 페이지 번호 (0부터 시작)
 * @param size 페이지 크기
 * @returns 페이지네이션된 작가 정보 오류 제보 목록
 */
export async function fetchInquiryStudios(page: number = 0, size: number = 10): Promise<InquiryStudioListResponse> {
  try {
    const endpoint = `${API_ENDPOINTS.inquiry.studios}?page=${page}&size=${size}`;
    return await get<InquiryStudioListResponse>(endpoint);
  } catch (error) {
    console.error('작가 정보 오류 제보 목록 가져오기 실패:', error);
    throw handleApiError(error);
  }
}

/**
 * 작가 정보 오류 제보를 생성하는 API
 * @param data 제보 정보
 * @returns 생성된 제보 정보
 */
export async function postInquiryStudio(data: InquiryStudioReq): Promise<ApiResponse<InquiryStudioReq>> {
  try {
    const endpoint = `${API_ENDPOINTS.inquiry.studios}`;
    return await post<ApiResponse<InquiryStudioReq>>(endpoint, data);
  } catch (error) {
    console.error('작가 정보 오류 제보 생성 실패:', error);
    throw handleApiError(error);
  }
}

/**
 * 서비스 문의 생성하는 API
 * @param data 문의 정보
 * @returns 생성된 문의 ID
 */
export async function postInquiryService(data: InquiryServiceReq): Promise<ApiResponse<{ inquiryId: number }>> {
  try {
    const endpoint = `${API_ENDPOINTS.inquiry.service}`;
    return await post<ApiResponse<{ inquiryId: number }>>(endpoint, data);
  } catch (error) {
    console.error('서비스 문의 생성 실패:', error);
    throw handleApiError(error);
  }
}

/**
 * 상품 옵션 문의 삭제하는 API
 * @param inquiryId 문의 ID
 * @param productId 상품 ID
 */
export async function deleteInquiryOption({
  inquiryId,
  productId,
}: {
  inquiryId: number;
  productId: number;
}): Promise<void> {
  try {
    const endpoint = API_ENDPOINTS.inquiry.options;
    await del(endpoint, { inquiryId, productId });
  } catch (error) {
    console.error('상품 옵션 문의 삭제 실패:', error);
    throw handleApiError(error);
  }
}
