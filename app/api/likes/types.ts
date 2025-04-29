import { ApiResponse, PagedResponse } from '../common/types';

interface AddLikeSuccess {
  likeId: number;
}

export type AddLikeResponse = ApiResponse<AddLikeSuccess>;

export interface RemoveLikeRequest {
  likeId: number;
  productId: number;
}

export type RemoveLikeResponse = ApiResponse<null>;

// MY 찜 상품 옵션 정의
export interface MainLikeProduct {
  likeId: number; // 좋아요 ID (0이면 좋아요 X, 0이외의 값이면 좋아요 O)
  productId: number;
  productOptionId: number;
  studioName: string;
  optionName: string;
  price: number;
  thumbnailUrl: string;
  originalProvided: boolean; //원본 제공 여부
  shootingHours: number; // 촬영 시간(시)
  shootingLocationCount: number; // 촬영 장소 수(단품인 경우 1 이상)
  costumeCount: number; // 의상 수량(단품인 경우 1 이상)
  retouchedCount: number; // 보정된 사진 수(단품인 경우 1 이상)
  discountRate: number; // 할인율
  shootingSeason: string[];
  availableSeasons: string[];
}

// 좋아요 페이지 응답
export type LikePageProductResponse = ApiResponse<PagedResponse<MainLikeProduct>>;

// MY 찜 스튜디오 정의(ProductResponse)
export interface MainLikeStudio {
  likeId: number; // 좋아요 ID (0이면 좋아요 X, 0이외의 값이면 좋아요 O)
  productId: number;
  name: string;
  thumbnailUrls: string[];
  minPrice: number;
  maxPrice: number;
  discountRate: number; // 할인율
  availableSeasons: string[];
  retouchStyles: string[];
}

// 좋아요 페이지 응답
export type LikePageStudioResponse = ApiResponse<PagedResponse<MainLikeStudio>>;
