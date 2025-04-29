import { MainLikeProduct } from '@/api/likes/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import ProductCard from './ProductCard';

interface ProductListProps {
  likeProducts: MainLikeProduct[];
  loading: boolean;
  error: string | null;
}

export default function ProductList({ likeProducts = [], loading, error }: ProductListProps) {
  return (
    <div>
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      )}
      {likeProducts?.length === 0 && !loading && !error && (
        <div className="text-body1Normal font-semibold text-center text-gray-90 py-4 rounded relative">
          찜한 상품이 없습니다.
        </div>
      )}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>}

      {!loading &&
        likeProducts.map((product: MainLikeProduct) => (
          <div key={product.likeId} className="mb-4">
            <ProductCard likeProduct={product} />
          </div>
        ))}
    </div>
  );
}
