// 필터 타입 정의
export type FilterType = "촬영시기" | "스타일" | "패키지";

// 상품 타입 정의
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  thumbnailUrl: string;
  details: {
    shootingTime: string;
    style: string;
    package: string;
    cut: string;
    clothes: string;
  };
}

// 작가 데이터 타입 정의
export interface AuthorDetail {
  id: string;
  name: string;
  profileImage: string;
  introduction: string;
  products: Product[];
  guidelines: string[];
  filters: Record<FilterType, string[] | string>;
}

// 목업 데이터
export const mockAuthorData: AuthorDetail = {
  id: "author1",
  name: "김감성",
  profileImage:
    "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?q=80",
  introduction:
    "자연스러운 순간의 감동을 담아내는 포토그래퍼입니다. 10년간의 웨딩, 가족사진 경력으로 소중한 순간을 특별하게 담아드립니다.",
  products: [
    {
      id: "p1",
      name: "베이직 웨딩 패키지",
      price: 990000,
      description: "본식 웨딩촬영 4시간 + 스냅 30컷 + 원본 전체제공",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80",
      details: {
        shootingTime: "4시간",
        style: "내추럴",
        cut: "30컷",
        package: "베이직",
        clothes: "2벌",
      },
    },
    {
      id: "p2",
      name: "프리미엄 가족사진",
      price: 590000,
      description: "실내/야외 촬영 2시간 + 보정본 20컷 + 원본 전체제공",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80",
      details: {
        shootingTime: "2시간",
        style: "캐주얼",
        package: "스탠다드",
        cut: "20컷",
        clothes: "2벌",
      },
    },
    {
      id: "p3",
      name: "커플 스냅",
      price: 390000,
      description: "야외 촬영 1시간 + 보정본 15컷 + 원본 전체제공",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80",
      details: {
        shootingTime: "1시간",
        style: "로맨틱",
        package: "라이트",
        cut: "15컷",
        clothes: "2벌",
      },
    },
  ],
  guidelines: [
    "- 촬영 일정 변경은 3일 전까지 가능합니다.",
    "- 우천시 실내 스튜디오 촬영으로 대체됩니다.",
    "- 촬영본은 2주 이내 발송됩니다.",
    "- 원본 파일은 USB로 제공됩니다.",
  ],
  filters: {
    촬영시기: "25년 하반기",
    스타일: ["내추럴", "로맨틱"],
    패키지: "패키지 있음",
  },
};
