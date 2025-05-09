'use client';

import { MainPageProduct } from '../../api/products/types';
import { useFilteringController } from '../controllers/FilteringController';
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

  // FilteringController 사용하여 필터 옵션 가져오기
  const { open, filterType, selectedFilters, handleFilterClick, setOpen, setSelectedFilters, applyFiltersAndSearch } =
    useFilteringController({
      setMainProducts: products => setMainProducts(products as MainPageProduct[]),
      setLoading,
      setError,
      fetchMainProducts,
      type: 'main',
    });

  return (
    <>
      <Filtering
        open={open}
        filterType={filterType}
        selectedFilters={selectedFilters}
        handleFilterClick={handleFilterClick}
        setOpen={setOpen}
        setSelectedFilters={setSelectedFilters}
        applyFiltersAndSearch={applyFiltersAndSearch}
      />
      <ProductList
        mainProducts={mainProducts}
        loading={loading}
        error={error}
        filterOptions={selectedFilters} // 필터 옵션 전달
      />
    </>
  );
}
