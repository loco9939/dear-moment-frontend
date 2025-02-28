import { cn } from '@/lib/utils';
import { SVGProps } from 'react';
import CancelCircleFilledSvg from './svg/cancel_circle_filled.svg';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Cancel_Circle_Filled 아이콘
 * @param size 아이콘 크기
 * @param props 아이콘 속성
 * @return SVG 컴포넌트
 * 
 * fill 속성으로 배경 색상 수정
 * stroke 속성으로 테두리 색상 수정=
 * 
 * 예시)
 *
 * `<Icon_Cancel_Circle_Filled className="fill-gray-95 stroke-transparent" size={32} />`
 */
export default function Icon_Cancel_Circle_Filled({
  size = 24,
  className,
  ...props
}: IconProps) {
  return <CancelCircleFilledSvg width={size} height={size} className={cn('fill-gray-95 stroke-transparent', className)} {...props} />;
}