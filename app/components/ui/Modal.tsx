'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  description?: ReactNode;
  primaryButton?: {
    text: string;
    onClick: () => void;
  };
  secondaryButton?: {
    text: string;
    onClick: () => void;
  };
}

/**
 * @param isOpen 모달 열림/닫힘 상태
 * @param title 제목
 * @param description 설명
 * @param primaryButton 주요 동작 버튼 (검은색)
 * @param secondaryButton 보조 동작 버튼 (회색)
 *
 * 단일 버튼일 경우, primaryButton만 사용
 *
 * 예시)
 * ```
 * <Modal
 *   isOpen={showModal}
 *   title="Title"
 *   description="Lorem ipsum, dolor sit"
 *   primaryButton={{
 *     text: "확인",
 *     onClick: handleConfirm
 *   }}
 *   secondaryButton={{
 *     text: "취소",
 *     onClick: handleCancel
 *   }}
 * />
 * ```
 */
export const Modal = ({ isOpen, title, description, primaryButton, secondaryButton }: ModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="min-h-[20rem] w-[30rem] space-y-[1.4rem] rounded-[0.2rem] bg-common-0 px-[2rem] pb-[2.2rem] pt-[2.6rem]">
        <DialogHeader className="space-y-[1.4rem]">
          <DialogTitle className="text-subtitle1 font-bold text-gray-95">{title}</DialogTitle>
          <DialogDescription className="min-h-[5rem] text-body2Reading font-medium text-gray-60">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-[1.2rem] text-body2Reading font-semibold text-gray-10">
          {secondaryButton && (
            <button onClick={secondaryButton.onClick} className="h-[4.4rem] w-1/2 rounded-[0.2rem] bg-gray-80">
              {secondaryButton.text}
            </button>
          )}
          {primaryButton && (
            <button
              onClick={primaryButton.onClick}
              className={`${secondaryButton ? 'w-1/2' : 'w-full'} h-[4.4rem] rounded-[0.2rem] bg-gray-95 text-common-0`}
            >
              {primaryButton.text}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
