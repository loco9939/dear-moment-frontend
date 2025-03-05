import { useState, useMemo, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', value = '', maxLength = 15, onChange, ...props }, ref) => {
    // type별 크기 설정
    const sizeClasses = {
      text: 'h-[52px]',
      textarea: 'h-[256px]',
    };

    const [isFocused, setIsFocused] = useState(false);
    const [maxLengthOver, setMaxLengthOver] = useState(false);

    const warningMessage = useMemo(() => `최대 ${maxLength}자까지 입력가능해요`, [maxLength]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (maxLength && inputValue.length > maxLength) {
        setMaxLengthOver(true);
      } else {
        setMaxLengthOver(false);
        onChange?.(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setMaxLengthOver(false);
      onChange?.(e);
    };

    return (
      <div className="w-[320px] text-[12px] text-base font-normal">
        <input
          type={type}
          className={cn(
            'flex w-full rounded-lg border gap-[19px] transition-all',
            'bg-gray-10', // 배경색
            'px-[12px] py-[16px]', // padding 좌우 12px, 위아래 16px
            'text-label1Reading',
            maxLengthOver && isFocused
              ? 'border-red-50 ring-1 ring-red-50 focus:outline-none' // 15자 초과 → 빨간 테두리
              : isFocused
              ? 'border-gray-600 focus:border-gray-600 focus:ring-1 focus:ring-gray-400 focus:outline-none' // 기본은 테두리 없음 → 포커스 시 회색 테두리
              : 'border-transparent', // 포커스 없고 15자 이하 -> 테두리 없음
            sizeClasses[type as keyof typeof sizeClasses] || 'h-[52px]',
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
        <div className="h-[6px]"></div>

        {/* 경고문구 및 글자수 표시 */}
        <div className="flex justify-between h-[17px] text-gray-50">
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
Input.displayName = 'Input';

export { Input };
