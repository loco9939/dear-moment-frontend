import { NavigationBar } from '@/components/NavigationBar';
import AuthorList from './_components/AuthorList';
import Filtering from './_components/Filtering';

export default function HomePage() {
  return (
    <div className="container space-y-4">
      <header className="text-2xl font-bold">Dear moment</header>
      <main className="space-y-4">
        <section>
          <Filtering />
        </section>
        <section>
          <AuthorList />
        </section>
        <section>
          <NavigationBar />
        </section>
      </main>
    </div>
  );
}
