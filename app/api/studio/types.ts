import { PartnerShop } from '../products/types';

export interface Studio {
  name: string; // 스튜디오 이름
  contact: string; // 연락처
  studioIntro: string; // 스튜디오 소개
  artistsIntro: string; // 작가 소개
  instagramUrl: string; // 인스타그램 URL
  kakaoChannelUrl: string; // 카카오 채널 URL
  reservationNotice: string; // 예약정보
  cancellationPolicy: string; // 환불 정책
  partnerShops: PartnerShop[];
}
