// 필터 타입 정의
export type FilterType = '촬영시기' | '스타일' | '패키지';

// 상품 타입 정의
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  thumbnailUrl: string;
  dcPrice?: number;
  details: {
    원본제공: string;
    시간: string;
    장소: string;
    의상: string;
    보정본: string;
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
export const mockAuthorsData: AuthorDetail[] = [
  {
    id: 'author1',
    name: '김감성',
    profileImage: 'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?q=80',
    introduction:
      '자연스러운 순간의 감동을 담아내는 포토그래퍼입니다. 10년간의 웨딩, 가족사진 경력으로 소중한 순간을 특별하게 담아드립니다.',
    products: [
      {
        id: 'p1',
        name: '베이직 웨딩 패키지',
        price: 990000,
        description: '본식 웨딩촬영 4시간 + 스냅 30컷 + 원본 전체제공',
        thumbnailUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80',
        dcPrice: 450000,
        details: {
          원본제공: '전체 제공',
          시간: '3시간',
          의상: '최대 2벌',
          장소: '2곳',
          보정본: '30장',
        },
      },
      {
        id: 'p2',
        name: '프리미엄 가족사진',
        price: 590000,
        description: '실내/야외 촬영 2시간 + 보정본 20컷 + 원본 전체제공',
        thumbnailUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80',
        details: {
          원본제공: '전체 제공',
          시간: '2시간',
          의상: '최대 2벌',
          장소: '2곳',
          보정본: '20장',
        },
      },
      {
        id: 'p3',
        name: '커플 스냅',
        price: 390000,
        description: '야외 촬영 1시간 + 보정본 15컷 + 원본 전체제공',
        thumbnailUrl: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80',
        details: {
          원본제공: '전체 제공',
          시간: '1시간',
          의상: '1벌',
          장소: '1곳',
          보정본: '15장',
        },
      },
      {
        id: 'p4',
        name: '베이직 웨딩 패키지',
        price: 990000,
        description: '본식 웨딩촬영 4시간 + 스냅 30컷 + 원본 전체제공',
        thumbnailUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80',
        dcPrice: 450000,
        details: {
          원본제공: '전체 제공',
          시간: '3시간',
          의상: '최대 2벌',
          장소: '2곳',
          보정본: '30장',
        },
      },
      {
        id: 'p5',
        name: '프리미엄 가족사진',
        price: 590000,
        description: '실내/야외 촬영 2시간 + 보정본 20컷 + 원본 전체제공',
        thumbnailUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80',
        details: {
          원본제공: '전체 제공',
          시간: '2시간',
          의상: '최대 2벌',
          장소: '2곳',
          보정본: '20장',
        },
      },
      {
        id: 'p6',
        name: '커플 스냅',
        price: 390000,
        description: '야외 촬영 1시간 + 보정본 15컷 + 원본 전체제공',
        thumbnailUrl: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80',
        details: {
          원본제공: '전체 제공',
          시간: '1시간',
          의상: '1벌',
          장소: '1곳',
          보정본: '15장',
        },
      },
      {
        id: 'p7',
        name: '베이직 웨딩 패키지',
        price: 990000,
        description: '본식 웨딩촬영 4시간 + 스냅 30컷 + 원본 전체제공',
        thumbnailUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80',
        dcPrice: 450000,
        details: {
          원본제공: '전체 제공',
          시간: '3시간',
          의상: '최대 2벌',
          장소: '2곳',
          보정본: '30장',
        },
      },
      {
        id: 'p8',
        name: '프리미엄 가족사진',
        price: 590000,
        description: '실내/야외 촬영 2시간 + 보정본 20컷 + 원본 전체제공',
        thumbnailUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80',
        details: {
          원본제공: '전체 제공',
          시간: '2시간',
          의상: '최대 2벌',
          장소: '2곳',
          보정본: '20장',
        },
      },
      {
        id: 'p9',
        name: '커플 스냅',
        price: 390000,
        description: '야외 촬영 1시간 + 보정본 15컷 + 원본 전체제공',
        thumbnailUrl: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80',
        details: {
          원본제공: '전체 제공',
          시간: '1시간',
          의상: '1벌',
          장소: '1곳',
          보정본: '15장',
        },
      },
    ],
    guidelines: [
      '- 촬영 일정 변경은 3일 전까지 가능합니다.',
      '- 우천시 실내 스튜디오 촬영으로 대체됩니다.',
      '- 촬영본은 2주 이내 발송됩니다.',
      '- 원본 파일은 USB로 제공됩니다.',
    ],
    filters: {
      촬영시기: '25년 하반기',
      스타일: ['내추럴', '로맨틱'],
      패키지: '패키지 있음',
    },
  },
  {
    id: 'author2',
    name: '오에브',
    profileImage: 'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?q=80',
    introduction:
      '자연스러운 순간의 감동을 담아내는 포토그래퍼입니다. 10년간의 웨딩, 가족사진 경력으로 소중한 순간을 특별하게 담아드립니다.',
    products: [
      {
        id: 'p1',
        name: '베이직 웨딩 패키지',
        price: 990000,
        description: '본식 웨딩촬영 4시간 + 스냅 30컷 + 원본 전체제공',
        thumbnailUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80',
        dcPrice: 450000,
        details: {
          원본제공: '전체 제공',
          시간: '3시간',
          의상: '최대 2벌',
          장소: '2곳',
          보정본: '30장',
        },
      },
      {
        id: 'p2',
        name: '프리미엄 가족사진',
        price: 590000,
        description: '실내/야외 촬영 2시간 + 보정본 20컷 + 원본 전체제공',
        thumbnailUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80',
        details: {
          원본제공: '전체 제공',
          시간: '2시간',
          의상: '최대 2벌',
          장소: '2곳',
          보정본: '20장',
        },
      },
      {
        id: 'p3',
        name: '커플 스냅',
        price: 390000,
        description: '야외 촬영 1시간 + 보정본 15컷 + 원본 전체제공',
        thumbnailUrl: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80',
        details: {
          원본제공: '전체 제공',
          시간: '1시간',
          의상: '1벌',
          장소: '1곳',
          보정본: '15장',
        },
      },
      {
        id: 'p4',
        name: '베이직 웨딩 패키지',
        price: 990000,
        description: '본식 웨딩촬영 4시간 + 스냅 30컷 + 원본 전체제공',
        thumbnailUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80',
        dcPrice: 450000,
        details: {
          원본제공: '전체 제공',
          시간: '3시간',
          의상: '최대 2벌',
          장소: '2곳',
          보정본: '30장',
        },
      },
      {
        id: 'p5',
        name: '프리미엄 가족사진',
        price: 590000,
        description: '실내/야외 촬영 2시간 + 보정본 20컷 + 원본 전체제공',
        thumbnailUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80',
        details: {
          원본제공: '전체 제공',
          시간: '2시간',
          의상: '최대 2벌',
          장소: '2곳',
          보정본: '20장',
        },
      },
      {
        id: 'p6',
        name: '커플 스냅',
        price: 390000,
        description: '야외 촬영 1시간 + 보정본 15컷 + 원본 전체제공',
        thumbnailUrl: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80',
        details: {
          원본제공: '전체 제공',
          시간: '1시간',
          의상: '1벌',
          장소: '1곳',
          보정본: '15장',
        },
      },
      {
        id: 'p7',
        name: '베이직 웨딩 패키지',
        price: 990000,
        description: '본식 웨딩촬영 4시간 + 스냅 30컷 + 원본 전체제공',
        thumbnailUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80',
        dcPrice: 450000,
        details: {
          원본제공: '전체 제공',
          시간: '3시간',
          의상: '최대 2벌',
          장소: '2곳',
          보정본: '30장',
        },
      },
      {
        id: 'p8',
        name: '프리미엄 가족사진',
        price: 590000,
        description: '실내/야외 촬영 2시간 + 보정본 20컷 + 원본 전체제공',
        thumbnailUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80',
        details: {
          원본제공: '전체 제공',
          시간: '2시간',
          의상: '최대 2벌',
          장소: '2곳',
          보정본: '20장',
        },
      },
      {
        id: 'p9',
        name: '커플 스냅',
        price: 390000,
        description: '야외 촬영 1시간 + 보정본 15컷 + 원본 전체제공',
        thumbnailUrl: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80',
        details: {
          원본제공: '전체 제공',
          시간: '1시간',
          의상: '1벌',
          장소: '1곳',
          보정본: '15장',
        },
      },
    ],
    guidelines: [
      '- 촬영 일정 변경은 3일 전까지 가능합니다.',
      '- 우천시 실내 스튜디오 촬영으로 대체됩니다.',
      '- 촬영본은 2주 이내 발송됩니다.',
      '- 원본 파일은 USB로 제공됩니다.',
    ],
    filters: {
      촬영시기: '25년 하반기',
      스타일: ['내추럴', '로맨틱'],
      패키지: '패키지 있음',
    },
  },
];
