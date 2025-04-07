import { addProductLike, removeProductLike } from '@/api/likes';
import { MainPageProduct } from '@/api/products/types';
import { useState } from 'react';

interface UseProductCardControllerProps {
  mainProduct: MainPageProduct;
}

export function useProductCardController({ mainProduct }: UseProductCardControllerProps) {
  const [isLiked, setIsLiked] = useState(mainProduct.likeId !== 0);

  const onClickHeart = async () => {
    if (isLiked) {
      await removeProductLike({ likeId: mainProduct.likeId, productId: mainProduct.productId });
      setIsLiked(false);
    } else {
      await addProductLike(mainProduct.productId);
      setIsLiked(true);
    }
  };

  return { isLiked, onClickHeart };
}
