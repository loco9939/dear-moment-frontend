import { Icon_Logo } from '@/assets/icons';
import { NavigationBar } from '@/components/NavigationBar';
import Link from 'next/link';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container min-h-screen flex flex-col">
      <header className="py-[1.5rem] px-[2rem]">
        <Link href="/" className="inline-block">
          <Icon_Logo width={120} height={23} />
        </Link>
      </header>

      <div className="flex-1">{children}</div>

      <NavigationBar />
    </div>
  );
}
