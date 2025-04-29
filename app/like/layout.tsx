import { NavigationBar } from '@/components/NavigationBar';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container min-h-screen flex flex-col">
    <header className="px-4 py-6">
      <h1 className="font-bold text-title2 text-gray-90">MY 찜</h1>
    </header>
    <div className="flex-1">{children}</div>
    <NavigationBar />
  </div>
  );
}
