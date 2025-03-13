"use client";

import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

// 드롭박스 타입
interface DropboxProps {
  placeholder?: string; // 드롭박스 플레이스홀더 텍스트
  dropdownItems?: Array<{ id: string; label: string; value: string | number }>; // 드롭박스 아이템 타입(label은 메뉴 아이템 표시 텍스트, value는 선택된 값)
  onChangeProps?: (value?: string) => void; // 드롭박스 값 변경 시 호출될 함수 (인자를 받아서 호출될 수도 있고 안받고 호출될 수 있음)
  onFocusProps?: (e?: React.FocusEvent<HTMLInputElement>) => void; // 드롭박스 포커스 시 호출될 함수 "
  onBlurProps?: (e?: React.FocusEvent<HTMLInputElement>) => void; // 드롭박스 블러 시 호출될 함수 "
  onMouseDownItemProps?: (selectedValue?: string) => void; // 드롭박스 메뉴 아이템 클릭 시 호출될 함수 "
  className?: string;
}

export const Dropbox = ({
  dropdownItems = [],
  placeholder = "입력",
  onChangeProps,
  onFocusProps,
  onBlurProps,
  onMouseDownItemProps,
  className,
}: DropboxProps) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const isFilled = value !== "";
  const isEmptyItems = dropdownItems.length === 0;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChangeProps?.(e.target.value);
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsOpen(true);
    onFocusProps?.(e);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsOpen(false);
    onBlurProps?.(e);
  };

  // onBlur 이벤트 보다 먼저 발생해야 하므로 onMouseDown 이벤트 사용
  const onMouseDownItem = (selectedValue: string) => () => {
    setValue(selectedValue);
    setIsOpen(false);
    onMouseDownItemProps?.(selectedValue);
  };

  return (
    <div className={`relative w-[32rem] h-[5rem] ${className}`}>
      <label
        className={`
          relative flex items-center rounded-[0.4rem]
          ${isOpen && !isEmptyItems && "rounded-b-none"}
          pl-[1.45rem] pr-[0.85rem] py-[1.3rem]
          bg-gray-10
					border
          ${isFilled ? "border-gray-50" : "border-gray-30"}
          placeholder:text-gray-50
        `}
      >
        <input
          className="w-full rounded-md text-body2Normal font-medium outline-none bg-transparent relative text-common-100"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <ChevronDown
          className={`h-[2.4rem] w-[2.4rem] transition-transform duration-200 relative text-gray-95 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </label>

      {/* 메뉴 */}
      {!isEmptyItems && (
        <menu
          className={`
          absolute w-full bg-gray-10 rounded-[0.4rem] rounded-t-none z-10
          border border-gray-30 border-t-0
          transition-all duration-200 ease-in-out
          overflow-y-auto scrollbar-hide
          ${
            isOpen
              ? "max-h-[20rem] opacity-100"
              : "max-h-0 opacity-0 py-0 pointer-events-none"
          }
        `}
        >
          {dropdownItems.map((item) => (
            <li
              key={item.id}
              className="h-[5rem] pl-[1.3rem] pr-[0.7rem] py-[1.8rem] hover:bg-gray-10 cursor-pointer text-body2Normal relative text-gray-70"
              onMouseDown={onMouseDownItem(item.label)}
            >
              <span>{item.label}</span>
            </li>
          ))}
        </menu>
      )}
    </div>
  );
};
