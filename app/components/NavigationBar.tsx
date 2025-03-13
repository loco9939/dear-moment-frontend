'use client';

import {
  Icon_Heart,
  Icon_Heart_Filled,
  Icon_Home,
  Icon_Home_Filled,
  Icon_User,
  Icon_User_Filled,
} from '@/assets/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 네비게이션 아이템 타입 정의
interface NavItem {
  href: string;
  label: string;
  icon: {
    default: React.ReactNode;
    active: React.ReactNode;
  };
}

export const NavigationBar = () => {
  const pathname = usePathname();

  // 네비게이션 아이템 설정
  const navItems: NavItem[] = [
    {
      href: '/',
      label: 'HOME',
      icon: {
        default: <Icon_Home />,
        active: <Icon_Home_Filled />,
      },
    },
    {
      href: '/like',
      label: 'LIKE',
      icon: {
        default: <Icon_Heart />,
        active: <Icon_Heart_Filled />,
      },
    },
    {
      href: '/my',
      label: 'MY',
      icon: {
        default: <Icon_User />,
        active: <Icon_User_Filled />,
      },
    },
  ];

  // 공통 스타일
  const linkBaseStyle = 'flex-1 flex-col justify-items-center';
  const labelBaseStyle = 'block text-label2 font-medium pt-[0.4rem]';

  return (
    <div className="flex relative">
      {navItems.map(item => {
        const isActive = pathname === item.href;

        return (
          <Link key={item.href} href={item.href} className={linkBaseStyle}>
            {isActive ? item.icon.active : item.icon.default}
            <span className={cn(labelBaseStyle, !isActive && 'text-gray-50')}>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};
