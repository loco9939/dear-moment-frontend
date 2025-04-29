'use client';

import Filtering from '@/(home)/_components/Filtering';
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
}

export default function ClientFilteringWrapper({
  initialLikeProducts,
  initialLikeStudios,
  initialError,
  initialLoading,
}: ClientFilteringWrapperProps) {
  const [isSelected, setIsSelected] = useState('product');
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

  return (
    <>
      <Tab isSelected={isSelected} onSelect={handleTabSelected} />
      {isSelected === 'product' ? (
        <>
          <Filtering
            type={'likeProduct'}
            setMainProducts={products => setLikeProducts(products as MainLikeProduct[])}
            setLoading={setLoading}
            setError={setError}
            fetchMainProducts={fetchLikeProductList}
          />
          <ProductList likeProducts={likeProducts} loading={loading} error={error} />
        </>
      ) : (
        <>
          <Filtering
            type={'likeStudio'}
            setMainProducts={products => setLikeStudios(products as MainLikeStudio[])}
            setLoading={setLoading}
            setError={setError}
            fetchMainProducts={fetchLikeStudioList}
          />
          <StudioList likeStudios={likeStudios} loading={loading} error={error} />
        </>
      )}
    </>
  );
}
