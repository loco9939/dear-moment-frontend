import { cn } from '@/lib/utils';
import { SVGProps } from 'react';
import HeartFilledSvg from './svg/heart_filled.svg';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Heart_Filled 아이콘
 * @param size 아이콘 크기
 * @param props 아이콘 속성
 * @return SVG 컴포넌트
 * 
 * fill 속성으로 배경 색상 수정
 * 
 * 예시)
 *
 * `<Icon_Heart_Filled className="fill-white" size={32} />`
 */
export default function Icon_Heart_Filled({
  size = 24,
  className,
  ...props
}: IconProps) {
  return <HeartFilledSvg width={size} height={size} className={cn('fill-red-40', className)} {...props} />;
}