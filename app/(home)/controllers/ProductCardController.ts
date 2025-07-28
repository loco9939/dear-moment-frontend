import { addProductLike, removeProductLike } from '@/api/likes';
import { MainPageProduct } from '@/api/products/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UseProductCardControllerProps {
  mainProduct: MainPageProduct;
}

export function useProductCardController({ mainProduct }: UseProductCardControllerProps) {
  const [isLiked, setIsLiked] = useState(mainProduct.likeId !== 0);
  const [currentLikeId, setCurrentLikeId] = useState(mainProduct.likeId);

  // mainProduct.likeId가 변경될 때마다 isLiked 상태 동기화
  useEffect(() => {
    const newIsLiked = mainProduct.likeId !== 0;
    setIsLiked(newIsLiked);
    if (newIsLiked) {
      setCurrentLikeId(mainProduct.likeId);
    } else {
      setCurrentLikeId(0);
    }
  }, [mainProduct.likeId]);

  const onClickHeart = async () => {
    try {
      if (isLiked) {
        // 좋아요 취소
        await removeProductLike({ likeId: currentLikeId, productId: mainProduct.productId });
        setIsLiked(false);
        setCurrentLikeId(0);
      } else {
        // 좋아요 추가
        const response = await addProductLike(mainProduct.productId);
        setIsLiked(true);
        // 응답에서 likeId를 추출하여 업데이트
        if (response?.data?.likeId) {
          setCurrentLikeId(response.data.likeId);
          toast('찜 설정이 완료되었습니다.');
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return { isLiked, onClickHeart };
}
