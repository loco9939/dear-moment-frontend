import ProductDetail from './_components/ProductDetail';
import { getProductDetail } from './actions/products';

export default async function ProductPage({ params }: { params: { id: string }; searchParams: { isLiked?: string } }) {
  const { id } = await params;

  // 서버 컴포넌트에서 데이터 페칭
  const { product, error } = await getProductDetail(Number(id));

  return <ProductDetail initProduct={product} initialError={error} />;
}
