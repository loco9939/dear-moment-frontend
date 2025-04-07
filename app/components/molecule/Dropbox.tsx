'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface BaseItem {
  id: string;
  label: string;
  value: string | number;
}
// 드롭박스 타입
interface DropboxProps {
  placeholder?: string; // 드롭박스 플레이스홀더 텍스트
  dropdownItems?: BaseItem[]; // 드롭박스 아이템 타입(label은 메뉴 아이템 표시 텍스트, value는 선택된 값)
  selectedItem?: BaseItem | null; // 드롭박스에 선택된 아이템
  onChangeProps?: (item: BaseItem | null) => void; // 드롭박스 값 변경 시 호출될 함수 (인자를 받아서 호출될 수도 있고 안받고 호출될 수 있음)
  className?: string;
}

export const Dropbox = ({
  dropdownItems = [],
  selectedItem,
  placeholder = '선택',
  onChangeProps,
  className,
}: DropboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDirection, setDropDirection] = useState<'up' | 'down'>('down');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLUListElement>(null);

  const isFilled = selectedItem !== null;

  useEffect(() => {
    // 외부 클릭 시 드롭다운 닫기
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 드롭다운 열리기 전에 드롭다운 방향 결정
  useLayoutEffect(() => {
    if (isOpen && dropdownRef.current && dropdownMenuRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const dropdownMenuHeight = dropdownMenuRef.current.scrollHeight;

      // 하단에 표시할 공간
      const spaceBelow = windowHeight - dropdownRect.bottom;
      // 상단에 표시할 공간
      const spaceAbove = dropdownRect.top;

      // 하단 공간이 드롭다운 메뉴 크기보다 작고, 상단 공간이 충분하면 상단에 표시
      if (spaceBelow < dropdownMenuHeight && spaceAbove > dropdownMenuHeight) {
        setDropDirection('up');
      } else {
        setDropDirection('down');
      }
    }
  }, [isOpen]);

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (item: BaseItem) => {
    // setSelectedLabel(item.label);
    setIsOpen(false);
    onChangeProps?.(item);
  };

  return (
    <div className={`relative w-[32rem] h-[5rem] ${className}`} ref={dropdownRef}>
      <div
        className={`
          w-full h-[5rem]
          pl-[1.45rem] pr-[3rem] py-[1.3rem]
          bg-gray-10
          border
          ${isFilled ? 'border-gray-50' : 'border-gray-30'}
          text-body2Normal font-medium outline-none relative
          flex items-center cursor-pointer
        `}
        onClick={handleSelectClick}
      >
        <span className={`${selectedItem ? 'text-common-100' : 'text-gray-50'}`}>
          {selectedItem?.label || placeholder}
        </span>
        <div className="absolute right-[0.85rem] top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ChevronDown
            className={`h-[2.4rem] w-[2.4rem] text-gray-95 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {/* 커스텀 드롭다운 메뉴 */}
      {isOpen && (
        <ul
          ref={dropdownMenuRef}
          className={`
            absolute w-full bg-white z-10
            border border-gray-30
            max-h-[20rem] overflow-y-auto
            scrollbar-hide
            ${dropDirection === 'up' ? 'bottom-[5rem]' : 'top-[5rem]'}
          `}
        >
          {dropdownItems.map(item => (
            <li
              key={item.id}
              className="px-[1.45rem] py-[1.3rem] hover:bg-gray-20 cursor-pointer text-body2Normal text-common-100"
              onClick={() => handleOptionClick(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
