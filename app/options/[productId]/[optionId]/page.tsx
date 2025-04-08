import OptionDetail from './_components/OptionDetail';
import { getProductOptionDetail } from './actions/products';

type PageProps = {
  params: Promise<{ productId: string; optionId: string }>;
};

export default async function ProductOptionsPage(props: PageProps) {
  // params 객체에서 직접 값을 추출
  const { productId, optionId } = await props.params;

  // 서버 컴포넌트에서 데이터 페칭
  const { product, productOption, error } = await getProductOptionDetail(Number(productId), Number(optionId));

  // 클라이언트 컴포넌트로 데이터 전달
  return <OptionDetail initialProduct={product} initialProductOption={productOption} initialError={error} />;
}
