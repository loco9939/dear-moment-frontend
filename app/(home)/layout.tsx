import { Icon_Logo } from '@/assets/icons';
import Link from 'next/link';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <header className="py-[1.5rem] px-[2rem]">
        <Link href="/" className="inline-block">
          <Icon_Logo width={120} height={23} />
        </Link>
      </header>

      {children}

      <section>
        <div>네비게이션</div>
      </section>
    </div>
  );
}
