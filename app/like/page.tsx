import LikeHome from './_components/LikePage';
import { getLikeProductsAndStudios } from './actions/like';

export default async function LikeMainPage({ searchParams }: { searchParams: Promise<{ isSelected?: string }> }) {
  const { products, studios, error } = await getLikeProductsAndStudios();
  const params = await searchParams;

  let initialTab = 'studio';
  if (params.isSelected === 'product') {
    initialTab = 'product';
  }

  return (
    <div className="space-y-4">
      <LikeHome
        initialLikeProducts={products}
        initialLikeStudios={studios}
        initialError={error}
        initialLoading={false}
        initialTab={initialTab}
      />
    </div>
  );
}
