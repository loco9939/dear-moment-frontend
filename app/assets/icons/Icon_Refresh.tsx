import { cn } from '@/lib/utils';
import { SVGProps } from 'react';
import RefreshSvg from './svg/refresh.svg';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Refresh 아이콘
 * @param size 아이콘 크기
 * @param props 아이콘 속성
 * @return SVG 컴포넌트
 * 
 * stroke 속성으로 색상 수정
 * 
 * 예시)
 *
 * `<Icon_Refresh className="stroke-gray-95" size={32} />`
 */
export default function Icon_Refresh({
  size = 24,
  className,
  ...props
}: IconProps) {
  return <RefreshSvg width={size} height={size} className={cn('fill-transparent stroke-gray-95', className)} {...props} />;
}