'use client';

import Filtering from '@/(home)/_components/Filtering';
import { useFilteringController } from '@/(home)/controllers/FilteringController';
import { MainLikeProduct, MainLikeStudio } from '@/api/likes/types';
import { useState } from 'react';
import { useLikeController } from '../controllers/LikeController';
import ProductList from './ProductList';
import StudioList from './StudioList';
import Tab from './Tab';

interface ClientFilteringWrapperProps {
  initialLikeProducts: MainLikeProduct[];
  initialLikeStudios: MainLikeStudio[];
  initialError: string | null;
  initialLoading: boolean;
  initialTab?: string;
}

export default function ClientFilteringWrapper({
  initialLikeProducts,
  initialLikeStudios,
  initialError,
  initialLoading,
  initialTab = 'product',
}: ClientFilteringWrapperProps) {
  const [isSelected, setIsSelected] = useState(initialTab);
  const {
    likeProducts,
    likeStudios,
    loading,
    error,
    setLikeProducts,
    setLikeStudios,
    fetchLikeProductList,
    fetchLikeStudioList,
    setLoading,
    setError,
  } = useLikeController({
    initialLikeProducts,
    initialLikeStudios,
    initialError,
    initialLoading,
  });

  const handleTabSelected = (selected: string) => {
    setIsSelected(selected);
  };

  const { open, filterType, selectedFilters, handleFilterClick, setOpen, setSelectedFilters, applyFiltersAndSearch } =
    useFilteringController({
      setMainProducts: products => setLikeProducts(products as MainLikeProduct[]),
      setLoading,
      setError,
      fetchMainProducts: fetchLikeProductList,
      type: 'likeProduct',
    });

  const {
    open: studioOpen,
    filterType: studioFilterType,
    selectedFilters: studioSelectedFilters,
    handleFilterClick: studioHandleFilterClick,
    setOpen: studioSetOpen,
    setSelectedFilters: studioSetSelectedFilters,
    applyFiltersAndSearch: studioApplyFiltersAndSearch,
  } = useFilteringController({
    setMainProducts: products => setLikeStudios(products as MainLikeStudio[]),
    setLoading,
    setError,
    fetchMainProducts: fetchLikeStudioList,
    type: 'likeStudio',
  });

  return (
    <>
      <Tab isSelected={isSelected} onSelect={handleTabSelected} />
      {isSelected === 'product' ? (
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
          <ProductList likeProducts={likeProducts} loading={loading} error={error} />
        </>
      ) : (
        <>
          <Filtering
            open={studioOpen}
            filterType={studioFilterType}
            selectedFilters={studioSelectedFilters}
            handleFilterClick={studioHandleFilterClick}
            setOpen={studioSetOpen}
            setSelectedFilters={studioSetSelectedFilters}
            applyFiltersAndSearch={studioApplyFiltersAndSearch}
          />
          <StudioList likeStudios={likeStudios} loading={loading} error={error} />
        </>
      )}
    </>
  );
}
