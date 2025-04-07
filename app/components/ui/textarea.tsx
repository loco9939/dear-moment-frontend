import { useState, useMemo, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, value = '', maxLength = 200, onChange, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [maxLengthOver, setMaxLengthOver] = useState(false);

    const warningMessage = useMemo(() => `최대 ${maxLength}자까지 입력가능해요`, [maxLength]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = e.target.value;

      if (maxLength && inputValue.length > maxLength) {
        setMaxLengthOver(true);
      } else {
        setMaxLengthOver(false);
        onChange?.(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      setMaxLengthOver(false);
      onChange?.(e);
    };

    return (
      <div className="w-[32rem] text-[1.2rem] text-base font-normal">
        <textarea
          className={cn(
            'flex w-full rounded-lg border gap-[1.9rem] transition-all',
            'bg-gray-10', // 배경색
            'px-[1.2rem] py-[1.6rem]', // padding 좌우 1.2rem, 위아래 1.6rem
            'text-label1Reading',
            'resize-none', // 크기 조절 비활성화
            'align-top', // 텍스트 상단 정렬
            'h-[25.6rem]', // 기본 높이
            maxLengthOver && isFocused
              ? 'border-red-50 ring-1 ring-red-50 focus:outline-none' // 최대 글자수 초과 → 빨간 테두리
              : isFocused
              ? 'border-gray-20 focus:border-gray-20 focus:ring-1 focus:ring-gray-400 focus:outline-none' // 기본은 테두리 없음 → 포커스 시 회색 테두리
              : 'border-transparent', // 포커스 없고 최대 글자수 이하 -> 테두리 없음
            className
          )}
          ref={ref}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />

        {/* 여백 */}
        <div className="h-[0.6rem]"></div>

        {/* 경고문구 및 글자수 표시 */}
        <div className="flex justify-between h-[1.7rem] text-gray-50">
          <span className={maxLengthOver && isFocused ? 'text-red-50' : ''}>
            {maxLengthOver && isFocused ? warningMessage : ''}
          </span>
          <span>
            <span
              className={
                maxLengthOver && isFocused ? 'text-red-50' : value.length > 0 ? 'text-gray-90' : 'text-gray-50'
              }
            >
              {value.length}
            </span>
            <span className={maxLengthOver ? 'text-gray-90' : 'text-gray-50'}> / {maxLength}</span>
          </span>
        </div>
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
