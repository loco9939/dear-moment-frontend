import ProductForm from '@/admin/_components/ProductForm';

interface ProductPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ProductPage = async ({ searchParams }: ProductPageProps) => {
  const params = await searchParams;

  const studioId = typeof params.studioId === 'string' ? params.studioId : null;
  const productId = typeof params.productId === 'string' ? params.productId : undefined;

  return (
    <div className="mx-auto my-[5rem] flex max-w-[90rem] flex-col gap-[6rem]">
      <header className="mb-[1rem] text-[2.4rem] font-semibold text-[#000000]">상품</header>
      <ProductForm studioId={studioId} productId={productId} />
    </div>
  );
};

export default ProductPage;
