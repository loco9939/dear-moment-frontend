interface PartnerShopsType {
  category: 'WEDDING_SHOP' | 'HAIR_MAKEUP' | 'DRESS' | 'MENS_SUIT' | 'BOUQUET' | 'VIDEO' | 'STUDIO' | 'ETC' | undefined;
  name: string;
  urlLink: string;
}

export interface StudioFormDataType {
  id?: number;
  userId?: number;
  status: 'ACTIVE' | 'INACTIVE';
  name: string;
  contact: string;
  studioIntro: string;
  artistsIntro: string;
  instagramUrl: string;
  kakaoChannelUrl: string;
  reservationNotice?: string;
  cancellationPolicy?: string;
  partnerShops?: PartnerShopsType[];
  isCasted: boolean | 'true' | 'false';
}
