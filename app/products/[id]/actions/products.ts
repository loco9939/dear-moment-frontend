import { fetchProductDetail } from '@/api';
import { ApiErrorImpl } from '@/api/error';

/**
 * 상품 상세 정보를 가져오는 서버 액션
 * @param id 상품 ID
 * @returns 상품 데이터와 에러 정보
 */
export async function getProductDetail(id: number) {
  try {
    const response = await fetchProductDetail(id);

    // API 응답 구조 확인 및 데이터 반환
    if (response.success && response.data) {
      return {
        product: response.data,
        error: null,
      };
    } else {
      return {
        product: null,
        error: '상품 데이터를 가져오는데 실패했습니다.',
      };
    }
  } catch (error) {
    console.error('서버 컴포넌트에서 상품 데이터 가져오기 실패:', error);

    let errorMessage = '알 수 없는 오류가 발생했습니다.';

    // 에러 유형에 따른 처리
    if (error instanceof ApiErrorImpl) {
      switch (error.code) {
        case 'NOT_FOUND':
          errorMessage = '상품 데이터를 찾을 수 없습니다.';
          break;
        case 'UNAUTHORIZED':
          errorMessage = '인증이 필요합니다.';
          break;
        default:
          errorMessage = `오류가 발생했습니다: ${error.message}`;
      }
    }

    return {
      product: null,
      error: errorMessage,
    };
  }
}
