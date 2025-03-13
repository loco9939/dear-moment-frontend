import { cn } from '@/lib/utils';
import { SVGProps } from 'react';
import HelpSvg from './svg/help.svg';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Help 아이콘
 * @param size 아이콘 크기
 * @param props 아이콘 속성
 * @return SVG 컴포넌트
 * 
 * fill 속성으로 배경 색상 수정
 * stroke 속성으로 테두리 색상 수정
 * 
 * 예시)
 *
 * `<Icon_Help className="fill-transparent stroke-gray-95" size={32} />`
 */
export default function Icon_Help({
  size = 24,
  className,
  ...props
}: IconProps) {
  return (
    <HelpSvg
      width={size}
      height={size}
      className={cn('fill-transparent stroke-gray-95', className)}
      {...props}
    />
  );
}