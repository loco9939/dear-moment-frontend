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

    // product_sheet 문의하기 이벤트 발생(GA)
    window.gtag('event', 'product_sheet_inquiry', {
      event_category: 'cta_click',
      event_label: 'product_sheet_inquiry',
      value: 'product_sheet_inquiry',
    });

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
      <SheetOverlay className="data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn" />
      <SheetContent
        onOpenAutoFocus={e => e.preventDefault()}
        side="bottom"
        className="container h-[28.2rem] rounded-t-[2rem] border-none bg-common-0 px-[2rem] data-[state=closed]:animate-slideDown data-[state=open]:animate-slideUp"
      >
        <SheetHeader>
          <SheetTitle className="mb-[2rem] mt-[3.2rem] text-subtitle2 font-bold">
            이 상품에 대해 작가에게 문의할게요
          </SheetTitle>
        </SheetHeader>
        <Dropbox
          placeholder="문의하실 상품을 선택해주세요"
          dropdownItems={dropdownItems}
          selectedItem={selectedItem}
          onChangeProps={handleProductSelect}
        />
        <div className="mt-[1.4rem] flex justify-between border-t border-gray-20 pt-[2.4rem]">
          <span className="text-body1Normal font-bold text-gray-70">문의 상품 금액</span>
          <span className="text-body1Normal font-semibold text-gray-90">
            {Boolean(selectedItem?.value) ? `${selectedItem?.value.toLocaleString()}원` : '-'}
          </span>
        </div>
        <div className="mt-[3.2rem] flex h-[5.6rem] items-center justify-between gap-[1rem]">
          <button
            className="bg-red-0 flex h-full w-[6.8rem] cursor-pointer items-center justify-center rounded-[0.4rem] border border-red-40"
            onClick={onClickHeart}
          >
            {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart className="stroke-red-40" />}
          </button>
          <button
            className={`h-full w-full rounded-[0.4rem] text-body1Normal font-semibold text-gray-10 ${
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
