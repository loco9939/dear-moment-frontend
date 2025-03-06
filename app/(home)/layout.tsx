export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container space-y-4">
      <header className="text-2xl font-bold">Dear moment</header>
      {children}
      <section>
        <div>네비게이션</div>
      </section>
    </div>
  );
}
