import { addOptionLike, removeOptionLike } from '@/api/likes';
import { ProductOption } from '@/api/products/types';
import { useLayoutEffect, useState } from 'react';
import { toast } from 'sonner';

// 상품 상세 페이지에서 전달받는 상품 옵션은 CSR로 갱신된 데이터일 수 있음
export function useProductOptionController({ productOption }: { productOption: ProductOption }) {
  const [isLiked, setIsLiked] = useState(productOption.likeId !== 0);

  // productOption.likeId 값이 변경될 때마다 상태 업데이트
  useLayoutEffect(() => {
    setIsLiked(productOption.likeId !== 0);
  }, [productOption.likeId]);

  const onClickHeart = async () => {
    if (isLiked) {
      await removeOptionLike({ likeId: productOption.likeId, optionId: productOption.optionId });
      setIsLiked(false);
    } else {
      await addOptionLike(productOption.optionId);
      setIsLiked(true);
      toast('찜 설정이 완료되었습니다.');
    }
  };

  return {
    isLiked,
    onClickHeart,
  };
}
