import { ApiResponse, PagedResponse } from '../common/types';
import { Studio } from '../studio/types';

// 상품 관련 API 타입 정의

// 이미지 타입 정의
export interface Image {
  imageId: number;
  url: string;
}

// 파트너 샵 타입 정의
export interface PartnerShop {
  category: string; // 파트너 샵 카테고리 'HAIR_MAKEUP' | 'DRESS' | 'MENS_SUIT' | 'BOUQUET' | 'VIDEO' | 'STUDIO' | 'ETC'
  name: string; // 파트너 샵 이름
  link: string; // 파트너 샵 링크
}

// 상품 옵션 타입 정의
export interface ProductOption {
  optionId: number; // 옵션 ID
  productId: number; // 상품 ID
  name: string; // 옵션 이름
  optionType: string; // 옵션 타입 'SINGLE' | 'PACKAGE
  discountAvailable: boolean; // 할인 가능 여부
  originalPrice: number; // 정가
  discountPrice: number; // 할인가
  description: string; // 옵션 설명
  costumeCount: number; // 의상 수
  shootingLocationCount: number; // 촬영지 수
  shootingHours: number; // 촬영 시간
  shootingMinutes: number; // 촬영 분
  retouchedCount: number; // 보정 사진 개수
  partnerShops: PartnerShop[]; // 파트너 샵 리스트
  createdAt: string; // 생성일
  updatedAt: string; // 수정일
  likeId: number; // 좋아요 ID (0이면 좋아요 X, 0이외의 값이면 좋아요 O)
}

// 상품 데이터 형식 정의
export interface Product {
  productId: number; // 상품 ID
  productType: string; // 상품 유형 'WEDDING_SNAP' 등
  shootingPlace: string; // 촬영장소 'JEJU' 등
  title: string; // 상품 제목
  description: string; // 상품 설명
  availableSeasons: string[]; // 촬영 가능 시기 'YEAR_2025_FIRST_HALF' 등
  cameraTypes: string[]; // 카메라 종류 'DIGITAL', 'FILM' 등
  retouchStyles: string[]; // 보정 스타일 'MODERN', 'VINTAGE' 등
  mainImage: Image; // 메인 이미지
  subImages: Image[]; // 서브 이미지 리스트
  additionalImages: Image[]; // 추가 이미지 리스트
  detailedInfo: string; // 상세 정보
  contactInfo: string; // 연락처 정보
  createdAt: string; // 생성일
  updatedAt: string; // 수정일
  options: ProductOption[]; // 상품 옵션 리스트
  studio: Studio; // 스튜디오 정보
  likeId: number; // 좋아요 ID (0이면 좋아요 X, 0이외의 값이면 좋아요 O)
}

// Main 페이지 상품 데이터 형식 정의
export interface MainPageProduct {
  productId: number;
  studioName: string; // 스튜디오 이름
  thumbnailUrls: string[]; // 썸네일 이미지 URL 리스트
  retouchStyles: string[]; // 보정 스타일 'MODERN', 'VINTAGE' 등
  shootingSeason: string[]; // 촬영 시기 'YEAR_2025_FIRST_HALF', 'YEAR_2025_SECOND_HALF' 등
  minPrice: number; // 최소 가격
  maxPrice: number; // 최대 가격
  discountRate: number; // 할인율
  likeId: number; // 좋아요 ID (0이면 좋아요 X, 0이외의 값이면 좋아요 O)
}

// 메인 페이지 상품 응답 형식
export type MainPageProductsResponse = ApiResponse<PagedResponse<MainPageProduct>>;

// 상품 상세 응답 형식
export type ProductDetailResponse = ApiResponse<Product>;

// 상품 검색 필터 요청 타입
export interface ProductSearchFilter {
  sortBy?: string[];
  availableSeasons?: string[];
  cameraTypes?: string[];
  retouchStyles?: string[];
  partnerShopCategories?: string[];
  minPrice?: number;
  maxPrice?: number;
}
