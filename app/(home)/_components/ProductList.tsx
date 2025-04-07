import { MainPageProduct } from '@/api/products/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import ProductCard from './ProductCard';

interface ProductListProps {
  mainProducts?: MainPageProduct[];
  loading?: boolean;
  error?: string | null;
}

export default function ProductList({ mainProducts = [], loading, error }: ProductListProps) {
  return (
    <section className="px-[2rem] ">
      <p className="text-body1Normal font-bold text-gray-90 mt-[2.4rem] mb-[2rem]">지금 가장 HOT한 스냅 작가!</p>

      <ul className="relative space-y-[1.7rem] h-[calc(100vh-20rem)] overflow-y-auto scrollbar-hide">
        {loading && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <LoadingSpinner />
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>
        )}
        {mainProducts.length === 0 && !loading && !error && (
          <div className="text-body1Normal font-semibold text-center text-gray-90 py-4 rounded relative">
            상품이 없습니다.
          </div>
        )}
        {mainProducts.map((mainProduct, index) => (
          <li
            key={mainProduct.productId}
            className="w-full"
            style={{
              marginBottom: index === mainProducts.length - 1 ? '2rem' : undefined,
            }}
          >
            <ProductCard isFirst={index === 0} mainProduct={mainProduct} />
          </li>
        ))}
      </ul>
    </section>
  );
}
