import { cn } from '@/lib/utils';
import { SVGProps } from 'react';
import FilterSvg from './svg/filter.svg';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Filter 아이콘
 * @param size 아이콘 크기
 * @param props 아이콘 속성
 * @return SVG 컴포넌트
 * 
 * fill 속성으로 배경 색상 수정
 * stroke 속성으로 색상 수정
 * 
 * 예시)
 *
 * `<Icon_Filter className="fill-transparent stroke-gray-95" size={32} />`
 */
export default function Icon_Filter({
  size = 24,
  className,
  ...props
}: IconProps) {
  return <FilterSvg width={size} height={size} className={cn('fill-transparent stroke-gray-95', className)} {...props} />;
}