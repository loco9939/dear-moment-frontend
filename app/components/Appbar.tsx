import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AppbarProps {
  logo?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  title?: string;
  className?: string;
}

/**
 * Appbar 컴포넌트
 * @param leftIcon 좌측 아이콘 (옵션)
 * @param rightIcon 우측 아이콘 (옵션)
 * @param title 중앙 타이틀 (옵션)
 * @param className 추가 스타일 클래스
 *
 * 예시:
 * ```tsx
 * 		// 제목과 아이콘 모두 있는 버전
 			<Appbar 
				leftIcon={<ChevronLeft onClick={onClickLeftIcon}  />}
				rightIcon={<X onClick={onClickRightIcon} />} 
				title="타이틀"
			/>
			// 제목과 좌측 아이콘만 있는 버전
      <Appbar 
				leftIcon={<ChevronLeft onClick={onClickLeftIcon} />} 
				title="타이틀"
			/>
			// 제목과 우측 아이콘만 있는 버전
      <Appbar 
				title="타이틀" 
				rightIcon={<X onClick={onClickRightIcon} />} 
			/>
      // 아이콘만 있는 버전
			<Appbar 
				leftIcon={<ChevronLeft onClick={onClickLeftIcon} />} 
				rightIcon={<X onClick={onClickRightIcon} />} 
			/>
			// 로고만 있는 버전
      <Appbar logo={<Image src="/author_thumb.png" alt="logo" width={24} height={24} />} />
 * ```
 */
export const Appbar = ({ logo, leftIcon, rightIcon, title, className }: AppbarProps) => {
  const styles = {
    container: cn('flex items-center justify-between px-[2rem] h-[5.4rem] relative', className),
    logoWrapper: 'w-[14rem] h-[2.4rem]',
    iconWrapper: 'w-[2.4rem] h-[2.4rem]',
    title: 'text-body1Normal font-bold absolute left-1/2 -translate-x-1/2',
  };

  return (
    <header className={styles.container}>
      {logo && (
        <Link href="/" className="cursor-pointer">
          <div className={styles.logoWrapper}>{logo}</div>
        </Link>
      )}
      {<div className={styles.iconWrapper}>{leftIcon}</div>}
      {title && <h1 className={styles.title}>{title}</h1>}
      {rightIcon && <div className={styles.iconWrapper}>{rightIcon}</div>}
    </header>
  );
};
