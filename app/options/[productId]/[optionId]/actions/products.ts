import { fetchProductDetail } from '@/api';
import { ApiErrorImpl } from '@/api/error';

/**
 * 상품 및 옵션 상세 정보를 가져오는 서버 액션
 * @param productId 상품 ID
 * @param optionId 옵션 ID
 * @returns 상품 데이터, 옵션 데이터, 에러 정보
 */
export async function getProductOptionDetail(productId: number, optionId: number) {
  try {
    const response = await fetchProductDetail(productId);

    // API 응답 구조 확인 및 데이터 반환
    if (response.success && response.data) {
      // 해당 옵션 찾기
      const option = response.data.options.find(opt => opt.optionId === optionId);

      if (option) {
        return {
          product: response.data,
          productOption: option,
          error: null,
        };
      } else {
        return {
          product: response.data,
          productOption: null,
          error: '해당 상품 옵션을 찾을 수 없습니다.',
        };
      }
    } else {
      return {
        product: null,
        productOption: null,
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
      productOption: null,
      error: errorMessage,
    };
  }
}
