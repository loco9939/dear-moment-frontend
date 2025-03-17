import ProductCard from '../like/ProductCard';

export default function ProductList() {
  return (
    <div>
      <ul>
        <li>
          <ProductCard />
        </li>
        <li>
          <ProductCard />
        </li>
        <li>
          <ProductCard />
        </li>
      </ul>
    </div>
  );
}
