import { cn } from '@/lib/utils';
import { forwardRef, useMemo, useState } from 'react';

interface InputProps extends React.ComponentProps<'input'> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  errorMessage?: string; // 부모 컴포넌트에서 전달받는 에러 메시지
  showLength?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', value = '', maxLength = 15, onChange, errorMessage, showLength, ...props }, ref) => {
    // type별 크기 설정
    const sizeClasses = {
      text: 'h-[5.2rem]',
      textarea: 'h-[25.6rem]',
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
      <div className="w-full text-[1.2rem] text-base font-normal">
        <input
          type={type}
          className={cn(
            'flex w-full rounded-lg border gap-[1.9rem] transition-all',
            'bg-gray-10', // 배경색
            'px-[1.2rem] py-[1.6rem]', // padding 좌우 1.2rem, 위아래 1.6rem
            'text-label1Reading',
            'mb-[0.6rem]',
            (maxLengthOver && isFocused) || errorMessage
              ? 'border-red-50 ring-1 ring-red-50 focus:outline-none' // 에러 상태 → 빨간 테두리
              : isFocused
              ? 'border-gray-20 focus:border-gray-20 focus:ring-1 focus:ring-gray-400 focus:outline-none' // 기본은 테두리 없음 → 포커스 시 회색 테두리
              : 'border-transparent', // 포커스 없고 에러 없음 -> 테두리 없음
            sizeClasses[type as keyof typeof sizeClasses] || 'h-[5.2rem]',
            className
          )}
          ref={ref}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />

        {/* 경고문구 및 글자수 표시 */}
        {errorMessage && (
          <div className="flex justify-between h-[1.7rem] text-gray-50">
            <span className={(maxLengthOver && isFocused) || errorMessage ? 'text-red-50' : ''}>
              {errorMessage || (maxLengthOver && isFocused ? warningMessage : '')}
            </span>
            {showLength && typeof value !== 'number' && (
              <span>
                <span
                  className={
                    (maxLengthOver && isFocused) || errorMessage
                      ? 'text-red-50'
                      : value.length > 0
                      ? 'text-gray-90'
                      : 'text-gray-50'
                  }
                >
                  {value.length}
                </span>
                <span className={maxLengthOver || errorMessage ? 'text-gray-90' : 'text-gray-50'}> / {maxLength}</span>
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
