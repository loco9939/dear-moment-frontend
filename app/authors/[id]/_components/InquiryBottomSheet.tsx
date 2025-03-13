import { Icon_Heart, Icon_Heart_Filled } from '@/assets/icons';
import { Dropbox } from '@/components/molecule/Dropbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dispatch, SetStateAction } from 'react';

interface InquiryBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLiked: boolean;
  setIsLiked: Dispatch<SetStateAction<boolean>>;
}

export const InquiryBottomSheet = ({ open, onOpenChange, isLiked, setIsLiked }: InquiryBottomSheetProps) => {
  const dropdownItems = [
    { id: '1', label: '1', value: '1' },
    { id: '2', label: '2', value: '2' },
    { id: '3', label: '3', value: '3' },
    { id: '4', label: '4', value: '4' },
    { id: '5', label: '5', value: '5' },
  ];
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        onOpenAutoFocus={e => e.preventDefault()}
        side="bottom"
        className="container h-[28.2rem] rounded-t-[2rem] border-none px-[2rem] bg-common-0"
      >
        <SheetHeader>
          <SheetTitle className="mt-[3.2rem] mb-[2rem] text-subtitle2 font-bold">
            이 상품에 대해 작가에게 문의할게요
          </SheetTitle>
        </SheetHeader>
        <Dropbox placeholder="문의하실 상품을 선택해주세요" dropdownItems={dropdownItems} />
        <div className="mt-[1.4rem] pt-[2.4rem] border-t border-gray-20 flex justify-between">
          <span className="text-body1Normal font-bold text-gray-70">문의 상품 금액</span>
          <span className="text-body1Normal font-semibold text-gray-90">850,000원</span>
        </div>
        <div className="h-[5.6rem] mt-[3.2rem] flex gap-[1rem] justify-between items-center">
          <button
            className="w-[6.8rem] h-full flex justify-center items-center bg-gray-80 rounded-[0.4rem] cursor-pointer"
            onClick={() => setIsLiked(!isLiked)}
          >
            {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart />}
          </button>
          <button className="w-[24.2rem] h-full text-body1Normal font-semibold text-gray-10 bg-common-100 rounded-[0.4rem]">
            문의하기
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
