export interface ImageType {
  imageId?: number | null;
  url: string;
  action?: 'KEEP' | 'DELETE' | 'UPLOAD';
  deletedImageId?: number | null;
  deletedIndex?: number | null;
}

interface PartnerShopType {
  category: 'WEDDING_SHOP' | 'HAIR_MAKEUP' | 'DRESS' | 'MENS_SUIT' | 'BOUQUET' | 'VIDEO' | 'STUDIO' | 'ETC';
  name: string;
  link: string;
}

export interface ProductOptionType {
  optionId: number | null;
  productId?: number;
  name: string;
  optionType: 'SINGLE' | 'PACKAGE';
  discountAvailable: boolean | string;
  originalPrice: number;
  discountPrice?: number;
  description?: string;
  costumeCount: number;
  shootingLocationCount: number;
  shootingHours: number;
  shootingMinutes: number;
  retouchedCount: number;
  partnerShops?: PartnerShopType[];
  originalProvided?: boolean | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFormDataType {
  productType: 'WEDDING_SNAP';
  shootingPlace: 'JEJU';
  title?: string;
  description?: string;
  availableSeasons: (
    | 'YEAR_2025_FIRST_HALF'
    | 'YEAR_2025_SECOND_HALF'
    | 'YEAR_2026_FIRST_HALF'
    | 'YEAR_2026_SECOND_HALF'
  )[];
  cameraTypes: ('DIGITAL' | 'FILM')[];
  retouchStyles: ('MODERN' | 'CHIC' | 'CALM' | 'VINTAGE' | 'FAIRYTALE' | 'WARM' | 'DREAMY' | 'BRIGHT' | 'NATURAL')[];
  detailedInfo?: string;
  contactInfo?: string;
  options: ProductOptionType[];

  productId?: number;
  createdAt?: string;
  updatedAt?: string;

  mainImage?: ImageType;
  subImages?: ImageType[];
  additionalImages?: ImageType[];
  mainImageFile?: File;
  subImageFiles?: File[];
  additionalImageFiles?: File[];
}
