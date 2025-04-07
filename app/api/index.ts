// 이 파일은 모든 API 함수를 재내보내기(re-export)하는 진입점 역할을 합니다.
// 각 도메인별 API 함수는 해당 도메인 폴더의 index.ts에서 가져옵니다.

// 상품 관련 API 함수 내보내기
export * from './products';

// 공통 타입 내보내기
export * from './common/types';

// 추후 다른 도메인 API가 추가되면 여기에 내보내기를 추가합니다.
// 예: export * from './users';
// 예: export * from './auth';

