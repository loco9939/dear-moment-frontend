import AuthorList from './_components/AuthorList';
import Filtering from './_components/Filtering';

export default function HomePage() {
  return (
    <main className="space-y-4">
      <Filtering />

      <AuthorList />
    </main>
  );
}
