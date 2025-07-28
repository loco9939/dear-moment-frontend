import { addInquiryOption } from '@/api/inquiries';
import { addOptionLike, removeOptionLike } from '@/api/likes';
import { Product, ProductOption } from '@/api/products/types';
import { useState } from 'react';
import { toast } from 'sonner';

export function useProductOptionController({
  initProductOption,
  initProduct,
}: {
  initProductOption: ProductOption | null;
  initProduct: Product | null;
}) {
  const [isLiked, setIsLiked] = useState(initProductOption?.likeId !== 0);

  // 상품 옵션 좋아요 API 연동
  const onClickHeart = async () => {
    try {
      if (!initProductOption) return;

      if (isLiked) {
        await removeOptionLike({ likeId: initProductOption.likeId, optionId: initProductOption.optionId });
        setIsLiked(false);
      } else {
        await addOptionLike(initProductOption.optionId);
        setIsLiked(true);
        toast('찜 설정이 완료되었습니다.');
      }

      // 세션 스토리지에 좋아요 상태 변경 저장
      sessionStorage.setItem('optionLikeChanged', 'true');
      sessionStorage.setItem('optionId', initProductOption.optionId.toString());

      // 상품 ID도 함께 저장 (상품 상세 페이지에서 필요)
      if (initProductOption.productId) {
        sessionStorage.setItem('productId', initProductOption.productId.toString());
      }
    } catch (error) {
      console.error('옵션 좋아요 액션 실패:', error);
    }
  };

  const onClickInquiry = async () => {
    try {
      if (!initProductOption || !initProduct) return;

      await addInquiryOption({
        productId: initProductOption.productId,
        optionId: initProductOption.optionId,
      });
      const url = initProduct?.studio?.kakaoChannelUrl;
      if (url) {
        window.open(url, '_blank');
      }
      alert('문의가 성공적으로 등록되었습니다.');
    } catch (error) {
      console.error('옵션 문의 액션 실패:', error);
    }
  };

  return {
    isLiked,
    onClickHeart,
    onClickInquiry,
  };
}
