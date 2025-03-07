export type FilterType = '정렬' | '촬영시기' | '카메라종류' | '보정스타일' | '패키지' | '가격';

// 가격 범위를 위한 인터페이스 정의
export interface PriceRange {
  min?: number;
  max?: number;
}

export type FilterValue = string | PriceRange | string[];
