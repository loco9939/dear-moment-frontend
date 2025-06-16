import { cn } from '@/lib/utils';
import { SVGProps } from 'react';
import QuitSvg from './svg/quit.svg';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Calendar 아이콘
 * @param size 아이콘 크기
 * @param props 아이콘 속성
 * @return SVG 컴포넌트
 *
 * fill 속성으로 색상 수정
 *
 * 예시)
 *
 * `<Icon_Quit className="fill-white" size={74} />`
 */
export default function Icon_Quit({ size = 74, className, ...props }: IconProps) {
  return <QuitSvg width={size} height={size} className={cn('fill-white', className)} {...props} />;
}
