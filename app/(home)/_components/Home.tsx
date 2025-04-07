'use client';

import { MainPageProduct } from '../../api/products/types';
import { useHomeController } from '../controllers/HomeController';
import Filtering from './Filtering';
import ProductList from './ProductList';

interface ClientFilteringWrapperProps {
  initialProducts: MainPageProduct[];
  initialError: string | null;
}

export default function ClientFilteringWrapper({ initialProducts, initialError }: ClientFilteringWrapperProps) {
  const { mainProducts, loading, error, setMainProducts, setLoading, setError, fetchMainProducts } = useHomeController({
    initialProducts,
    initialError,
  });

  return (
    <>
      <Filtering
        setMainProducts={setMainProducts}
        setLoading={setLoading}
        setError={setError}
        fetchMainProducts={fetchMainProducts}
      />
      <ProductList mainProducts={mainProducts} loading={loading} error={error} />
    </>
  );
}
