'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { studioIdStore } from '../_stores/studioIdStore';
import { productIdStore } from '../_stores/productIdStore';
import { getStorage } from '@/utils/localStorage';

const NavBar = () => {
  const token = getStorage('adminAccessToken');
  const { id } = studioIdStore();
  const params = useSearchParams();
  const studioId = id || params.get('studioId');
  const { productId } = productIdStore();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="mt-[10rem]">
      <nav className="top-[0.9rem] flex h-[5.3rem] w-[100vw] bg-[#E2DEDE] text-[#0B0B0B]">
        <section
          onClick={() => {
            if (studioId) {
              if (productId) {
                router.push(`/admin/studio?studioId=${studioId}&productId=${productId}`);
              } else {
                router.push(`/admin/studio?studioId=${studioId}`);
              }
            } else {
              router.push('/admin/studio');
            }
          }}
          className={clsx(
            'flex w-[15.1rem] cursor-pointer items-center justify-center text-[1.4rem] font-semibold',
            pathname.includes('studio') && 'bg-[#4D4242] text-[#FFFFFF]'
          )}
        >
          스튜디오 관리
        </section>
        <section
          onClick={() => {
            if (token && studioId) {
              if (productId) {
                router.push(`/admin/product?studioId=${studioId}&productId=${productId}`);
              } else {
                router.push(`/admin/product?studioId=${studioId}`);
              }
            } else {
              if (!token) {
                alert('로그인 후, 상품 관리가 가능합니다.');
              } else if (!studioId) {
                alert('스튜디오 생성 후, 상품 등록이 가능합니다.');
              }
            }
          }}
          className={clsx(
            'flex w-[15.1rem] cursor-pointer items-center justify-center text-[1.4rem] font-semibold',
            pathname.includes('product') && 'bg-[#4D4242] text-[#FFFFFF]'
          )}
        >
          상품 관리
        </section>
      </nav>
    </div>
  );
};

export default NavBar;
