import OptionDetail from './_components/OptionDetail';
import { getProductOptionDetail } from './actions/products';

export default async function ProductOptionsPage({ params }: { params: { productId: string; optionId: string } }) {
  // params를 await하여 사용
  const { productId, optionId } = await params;

  // 서버 컴포넌트에서 데이터 페칭
  const { product, productOption, error } = await getProductOptionDetail(Number(productId), Number(optionId));

  // 클라이언트 컴포넌트로 데이터 전달
  return <OptionDetail initialProduct={product} initialProductOption={productOption} initialError={error} />;
}
