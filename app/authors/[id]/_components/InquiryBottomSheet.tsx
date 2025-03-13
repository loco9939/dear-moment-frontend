import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface InquiryBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InquiryBottomSheet = ({ open, onOpenChange }: InquiryBottomSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="container h-[80vh] rounded-lg border-none bg-gray-500">
        <SheetHeader>
          <SheetTitle>이 상품에 대해 작가에게 문의할게요</SheetTitle>
        </SheetHeader>
        {/* 스크롤 가능한 컨테이너 추가 */}
        <span>문의 상품 금액</span>
        <span>850,000원</span>
      </SheetContent>
    </Sheet>
  );
};
