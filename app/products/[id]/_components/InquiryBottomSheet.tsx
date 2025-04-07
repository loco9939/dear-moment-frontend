import { addInquiryOption } from '@/api/inquiries';
import { Product } from '@/api/products/types';
import { Icon_Heart, Icon_Heart_Filled } from '@/assets/icons';
import { BaseItem, Dropbox } from '@/components/molecule/Dropbox';
import { Sheet, SheetContent, SheetHeader, SheetOverlay, SheetTitle } from '@/components/ui/sheet';
import { useState } from 'react';

interface InquiryBottomSheetProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLiked: boolean;
  onClickHeart: () => void;
}

export const InquiryBottomSheet = ({ product, open, onOpenChange, isLiked, onClickHeart }: InquiryBottomSheetProps) => {
  const [selectedItem, setSelectedItem] = useState<BaseItem | null>(null);

  const dropdownItems = product?.options.map(option => ({
    id: option.optionId.toString(),
    label: option.name,
    value: option.discountPrice,
  }));

  // 상품 선택 시 가격 업데이트
  const handleProductSelect = (item: BaseItem | null) => {
    setSelectedItem(item);
  };

  const onClickInquiry = async () => {
    if (!selectedItem) return;
    const currOption = product?.options.find(option => option.optionId === Number(selectedItem.id));

    try {
      if (!currOption) return;

      await addInquiryOption({ productId: currOption.productId, optionId: currOption.optionId });
      const url = product?.studio?.kakaoChannelUrl;
      if (url) {
        window.open(url, '_blank');
      }
      alert('문의가 성공적으로 등록되었습니다.');
    } catch (error) {
      console.error('문의하기 API 호출 중 오류:', error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetOverlay className="data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut" />
      <SheetContent
        onOpenAutoFocus={e => e.preventDefault()}
        side="bottom"
        className="container h-[28.2rem] rounded-t-[2rem] border-none px-[2rem] bg-common-0
        data-[state=open]:animate-slideUp
        data-[state=closed]:animate-slideDown"
      >
        <SheetHeader>
          <SheetTitle className="mt-[3.2rem] mb-[2rem] text-subtitle2 font-bold">
            이 상품에 대해 작가에게 문의할게요
          </SheetTitle>
        </SheetHeader>
        <Dropbox
          placeholder="문의하실 상품을 선택해주세요"
          dropdownItems={dropdownItems}
          selectedItem={selectedItem}
          onChangeProps={handleProductSelect}
        />
        <div className="mt-[1.4rem] pt-[2.4rem] border-t border-gray-20 flex justify-between">
          <span className="text-body1Normal font-bold text-gray-70">문의 상품 금액</span>
          <span className="text-body1Normal font-semibold text-gray-90">
            {Boolean(selectedItem?.value) ? `${selectedItem?.value.toLocaleString()}원` : '-'}
          </span>
        </div>
        <div className="h-[5.6rem] mt-[3.2rem] flex gap-[1rem] justify-between items-center">
          <button
            className="w-[6.8rem] h-full flex justify-center items-center bg-red-0 border border-red-40 rounded-[0.4rem] cursor-pointer"
            onClick={onClickHeart}
          >
            {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart className="stroke-red-40" />}
          </button>
          <button
            className={`w-[24.2rem] h-full text-body1Normal font-semibold text-gray-10 rounded-[0.4rem] ${
              selectedItem ? 'bg-red-40' : 'bg-gray-40'
            }`}
            disabled={!selectedItem}
            onClick={onClickInquiry}
          >
            문의하기
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
