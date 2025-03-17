'use client';

import { useState } from 'react';
import Filtering from '../_components/Filtering';
import Tab from '../_components/like/Tab';
import AuthorList from '../_components/AuthorList';
import ProductList from '../_components/like/ProductList';

export default function LikePage() {
  const [isSelected, setIsSelected] = useState('product');
  const handleTabSelected = (selected: string) => {
    setIsSelected(selected);
    console.log('isSelected', isSelected);
  };
  return (
    <div className="space-y-4">
      <Tab isSelected={isSelected} onSelect={handleTabSelected}></Tab>
      <Filtering />
      {isSelected === 'product' ? <ProductList /> : <AuthorList />}
    </div>
  );
}
