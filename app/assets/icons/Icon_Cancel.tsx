import { cn } from '@/lib/utils';
import { SVGProps } from 'react';
import CancelSvg from './svg/cancel.svg';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Cancel 아이콘
 * @param size 아이콘 크기
 * @param props 아이콘 속성
 * @return SVG 컴포넌트
 * 
 * stroke 속성으로 색상 수정
 * 
 * 예시)
 *
 * `<Icon_Cancel className="stroke-gray-95" size={32} />`
 */
export default function Icon_Cancel({
  size = 24,
  className,
  ...props
}: IconProps) {
  return <CancelSvg width={size} height={size} className={cn('stroke-gray-95', className)} {...props} />;
}