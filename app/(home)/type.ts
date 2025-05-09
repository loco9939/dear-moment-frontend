export type FilterType = 'sortBy' | 'shootingPeriod' | 'cameraType' | 'retouchStyle' | 'packageType' | 'priceRange';

// 정렬 옵션 타입
export type SortOption = 'RECOMMENDED' | 'POPULAR' | 'PRICE_LOW' | 'PRICE_HIGH';

// 촬영 시기 타입
export type ShootingPeriod =
  | 'YEAR_2025_FIRST_HALF'
  | 'YEAR_2025_SECOND_HALF'
  | 'YEAR_2026_FIRST_HALF'
  | 'YEAR_2026_SECOND_HALF';

// 카메라 종류 타입
export type CameraType = 'DIGITAL' | 'FILM';

// 보정 스타일 타입
export type RetouchStyle =
  | 'MODERN'
  | 'CHIC'
  | 'CALM'
  | 'VINTAGE'
  | 'FAIRYTALE'
  | 'WARM'
  | 'DREAMY'
  | 'BRIGHT'
  | 'NATURAL';

// 패키지 타입
export type PackageType =
  | 'WEDDING_SHOP'
  | 'HAIR_MAKEUP'
  | 'DRESS'
  | 'MENS_SUIT'
  | 'BOUQUET'
  | 'VIDEO'
  | 'STUDIO'
  | 'ETC';

// 가격 범위를 위한 인터페이스 정의
/**
 * 가격 범위를 나타내는 객체 인터페이스
 * min: 최소 가격
 * max: 최대 가격
 */
export interface PriceRange {
  min?: number;
  max?: number;
}

// 필터 값 타입
export type FilterValue =
  | SortOption
  | ShootingPeriod[]
  | CameraType[]
  | RetouchStyle[]
  | PackageType
  | PriceRange
  | string
  | string[];
