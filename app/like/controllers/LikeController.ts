import { useState } from 'react';
import { searchLikeOptionList, searchLikeStudioList } from '@/api/likes/index';
import { MainLikeProduct, MainLikeStudio } from '@/api/likes/types';
import { ApiErrorImpl } from '@/api/error';

export function useLikeController({
  initialLikeProducts,
  initialLikeStudios,
  initialError,
  initialLoading,
}: {
  initialLikeProducts: MainLikeProduct[];
  initialLikeStudios: MainLikeStudio[];
  initialError: string | null;
  initialLoading: boolean;
}) {
  const [likeProducts, setLikeProducts] = useState<MainLikeProduct[]>(initialLikeProducts);
  const [likeStudios, setLikeStudios] = useState<MainLikeStudio[]>(initialLikeStudios);
  const [loading, setLoading] = useState<boolean>(initialLoading);
  const [error, setError] = useState<string | null>(initialError);

  const fetchLikeProductList = async (pageNumber: number = 0) => {
    try {
      setLoading(true);
      setError(null);

      const response = await searchLikeOptionList(pageNumber, 10);

      if (response.success && response.data) {
        setLikeProducts(response.data.content);
      } else {
        setError('상품 데이터를 가져오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('상품 데이터 가져오기 실패:', error);

      if (error instanceof ApiErrorImpl) {
        switch (error.code) {
          case 'NOT_FOUND':
            setError('상품 데이터를 찾을 수 없습니다.');
            break;
          case 'UNAUTHORIZED':
            setError('인증이 필요합니다.');
            break;
          default:
            setError(`오류가 발생했습니다: ${error.message}`);
        }
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchLikeStudioList = async (pageNumber: number = 0) => {
    try {
      setLoading(true);
      setError(null);

      const response = await searchLikeStudioList(pageNumber, 10);

      if (response.success && response.data) {
        setLikeStudios(response.data.content);
      } else {
        setError('스튜디오 데이터를 가져오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('스튜디오 데이터 가져오기 실패:', error);
      if (error instanceof ApiErrorImpl) {
        switch (error.code) {
          case 'NOT_FOUND':
            setError('스튜디오 데이터를 찾을 수 없습니다.');
            break;
          case 'UNAUTHORIZED':
            setError('인증이 필요합니다.');
            break;
          default:
            setError(`오류가 발생했습니다: ${error.message}`);
        }
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    likeProducts,
    likeStudios,
    loading,
    error,
    setLikeProducts,
    setLikeStudios,
    setLoading,
    setError,
    fetchLikeProductList,
    fetchLikeStudioList,
  };
}
