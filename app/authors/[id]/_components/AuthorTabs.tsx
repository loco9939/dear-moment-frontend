import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/mock/authorData";
import { HeartIcon } from "lucide-react";
import { useState } from "react";

interface AuthorTabsProps {
  products: Product[];
  guidelines: string[];
}

export default function AuthorTabs({ products, guidelines }: AuthorTabsProps) {
  // 각 상품의 좋아요 상태를 관리하는 상태 객체
  const [likedProducts, setLikedProducts] = useState<Record<string, boolean>>(
    {}
  );

  // 좋아요 토글 핸들러
  const handleLikeToggle = (productId: string) => {
    setLikedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <Tabs defaultValue="상품정보">
      <TabsList className="w-full sticky top-[-1px] z-10 rounded-none border-b border-gray-800">
        <TabsTrigger
          value="상품정보"
          className="flex-1 data-[state=active]:border-b-2 data-[state=active]:text-yellow-500"
        >
          상품정보
        </TabsTrigger>
        <TabsTrigger
          value="안내사항"
          className="flex-1 data-[state=active]:border-b-2 data-[state=active]:text-yellow-500"
        >
          안내사항
        </TabsTrigger>
      </TabsList>

      <TabsContent value="상품정보" className="my-6">
        <ul>
          {products.map((product) => (
            <li
              className="border border-gray-800 rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-800 transition-colors"
              key={product.id}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-white">{product.name}</span>
                <button
                  className={`transition-colors ${
                    likedProducts[product.id] ? "text-red-500" : "text-gray-400"
                  }`}
                  onClick={() => handleLikeToggle(product.id)}
                  aria-label={
                    likedProducts[product.id] ? "좋아요 취소" : "좋아요"
                  }
                >
                  <HeartIcon
                    className="w-6 h-6"
                    fill={likedProducts[product.id] ? "currentColor" : "none"}
                  />
                </button>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg text-white">
                  {product.price.toLocaleString()}원
                </span>
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-sm text-white">
                <div className="flex justify-between pr-4">
                  <span>시간</span>
                  <span>{product.details.shootingTime}</span>
                </div>
                <div className="flex justify-between pr-4">
                  <span>컷수</span>
                  <span>{product.details.cut}</span>
                </div>
                <div className="flex justify-between pr-4">
                  <span>의상</span>
                  <span>{product.details.clothes}</span>
                </div>
                <div className="flex justify-between pr-4">
                  <span>원본</span>
                  <span>있음</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="안내사항" className="my-6">
        <div className="space-y-4 text-white">
          {guidelines.map((guideline, index) => (
            <p key={index}>{guideline}</p>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
