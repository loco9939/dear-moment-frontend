import { cn } from '@/lib/utils';
import { SVGProps } from 'react';
import CancelCircleSvg from './svg/cancel_circle.svg';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Cancel_Circle 아이콘
 * @param size 아이콘 크기
 * @param props 아이콘 속성
 * @return SVG 컴포넌트
 * 
 * fill 속성으로 배경 색상 수정
 * stroke 속성으로 테두리 색상 수정=
 * 
 * 예시)
 *
 * `<Icon_Cancel_Circle className="fill-transparent stroke-gray-95" size={32} />`
 */
export default function Icon_Cancel_Circle({
  size = 24,
  className,
  ...props
}: IconProps) {
  return <CancelCircleSvg width={size} height={size} className={cn('fill-transparent stroke-gray-95', className)} {...props} />;
}