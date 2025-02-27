'use client';

import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  actionBtn1?: ReactNode;
  actionBtn2?: ReactNode;
}

/**
 * @param isOpen 모달 열림/닫힘 상태
 * @param title 제목
 * @param description 설명
 * @param actionBtn1 첫번째 버튼(좌측)
 * @param actionBtn2 두번째 버튼(우측)
 *
 * 단일 버튼일 경우, actionBtn1만 사용
 *
 * 예시)
 *
 * ```
 * <Modal
 *  isOpen={showModal}
		title="Title"
		description="Lorem ipsum, dolor sit "
		actionBtn1={<Button />}
		actionBtn2={<Button onClick={onCloseModal} />}
	/>
 * ```
 */
export const Modal = ({ isOpen, title, description, actionBtn1, actionBtn2 }: ModalProps) => {
  const modalRoot = document.getElementById('modal');

  if (!modalRoot || !isOpen) return null;

  return createPortal(
    <aside className="space-y-[1.4rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[20rem] bg-common-0 z-10 px-[2rem] pt-[2.6rem] pb-[2.2rem]">
      <p className="text-subtitle1 font-bold text-gray-95">{title}</p>
      <div className="h-[5rem] flex items-center">
        <p className="text-body2Reading font-medium text-gray-60">{description}</p>
      </div>
      <div className="flex gap-[1.2rem]">
        <div className={`${actionBtn2 ? 'w-1/2' : 'w-full'}`}>{actionBtn1}</div>
        {actionBtn2 && <div className="w-1/2">{actionBtn2}</div>}
      </div>
    </aside>,
    modalRoot
  );
};
