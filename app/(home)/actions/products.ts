import { fetchMainPageProducts } from '@/api';
import { ApiErrorImpl } from '@/api/error';

// 서버 컴포넌트에서 데이터를 가져오는 함수
export async function getMainProducts(pageNumber: number = 0, size: number = 10) {
  try {
    const response = await fetchMainPageProducts(pageNumber, size);

    // API 응답 구조 확인 및 데이터 반환
    if (response.success && response.data) {
      return {
        products: response.data.content,
        error: null,
      };
    } else {
      return {
        products: [],
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
      products: [],
      error: errorMessage,
    };
  }
}
