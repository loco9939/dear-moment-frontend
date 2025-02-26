import { cn } from '@/lib/utils';
import { SVGProps } from 'react';
import LogoSvg from './svg/logo.svg';

interface IconProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?:number;
}

/**
 * Logo 아이콘
 * @param width 아이콘 너비
 * @param height 아이콘 높이
 * @param props 아이콘 속성
 * @return SVG 컴포넌트
 *
 * fill 속성으로 배경 색상 수정
 *
 * 예시)
 *
 * `<Icon_Logo className="fill-red-30" width={140} height={24} />`
 */
export default function Icon_Logo({
  width = 140,
  height = 24,
  className,
  ...props
}: IconProps) {
  return <LogoSvg width={width} height={height} className={cn('fill-red-30', className)} {...props} />;
}