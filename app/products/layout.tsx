'use client';

import { Icon_ChevronDown } from '@/assets/icons';
import { Appbar } from '@/components/Appbar';
import { useRouter } from 'next/navigation';

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div className="container">
      <Appbar
        leftIcon={<Icon_ChevronDown onClick={() => router.back()} className="rotate-90 cursor-pointer" />}
        title="상품 설명"
      />
      {children}
    </div>
  );
};

export default ProductsLayout;
