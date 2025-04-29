import LikeHome from './_components/LikePage';
import { getLikeProductsAndStudios } from './actions/like';

export default async function LikeMainPage() {
  const { products, studios, error } = await getLikeProductsAndStudios();
  return (
    <div className="space-y-4">
      <LikeHome
        initialLikeProducts={products}
        initialLikeStudios={studios}
        initialError={error}
        initialLoading={false}
      />
    </div>
  );
}
