import { addProductLike, removeProductLike } from '@/api/likes';
import { fetchProductDetail } from '@/api/products';
import { Product } from '@/api/products/types';
import { useEffect, useState } from 'react';

export function useProductDetailController({ initProduct }: { initProduct: Product | null }) {
  const [currentProduct, setCurrentProduct] = useState(initProduct);
  const [isLiked, setIsLiked] = useState(initProduct?.likeId !== 0);
  const [isOpenInquiry, setIsOpenInquiry] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // 상품 데이터 다시 가져오기
  const refreshProductData = async () => {
    if (!currentProduct) return;

    try {
      const { data: refreshedProduct } = await fetchProductDetail(currentProduct.productId);

      if (refreshedProduct) {
        setCurrentProduct(refreshedProduct);
        setIsLiked(refreshedProduct.likeId !== 0);
      }
    } catch (error) {
      console.error('상품 데이터 가져오기 실패:', error);
    }
  };

  // 세션 스토리지에서 옵션 좋아요 상태 변경 여부 확인
  useEffect(() => {
    // 세션 스토리지에서 상태 변경 정보 가져오기
    const optionLikeChanged = sessionStorage.getItem('optionLikeChanged');
    const storedProductId = sessionStorage.getItem('productId');

    // NOTE: 만약에 상품 옵션 페이지에서 다른 상품의 옵션으로 이동 가능하다면 오류 발생 가능성 예방을 위해 상품 ID, 저장된 상품 ID 비교
    // 현재 상품 ID와 저장된 상품 ID가 일치하고, 좋아요 상태가 변경되었을 때만 데이터 다시 가져오기
    if (optionLikeChanged === 'true' && currentProduct && storedProductId === currentProduct.productId.toString()) {
      refreshProductData();

      // 세션 스토리지 정보 제거
      sessionStorage.removeItem('optionLikeChanged');
      sessionStorage.removeItem('optionId');
      sessionStorage.removeItem('productId');
    }
  }, []);

  const onClickHeart = async () => {
    if (!currentProduct) return;

    if (isLiked) {
      await removeProductLike({ likeId: currentProduct.likeId, productId: currentProduct.productId });
      setIsLiked(false);
    } else {
      await addProductLike(currentProduct.productId);
      setIsLiked(true);
    }
  };

  const onSelectImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  const onResetImage = () => {
    setSelectedImageIndex(null);
  };

  return {
    product: currentProduct,
    isLiked,
    onClickHeart,
    isOpenInquiry,
    selectedImageIndex,
    setIsOpenInquiry,
    onSelectImage,
    onResetImage,
  };
}
