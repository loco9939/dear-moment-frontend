import { ApiResponse, PagedResponse } from '../common/types';

export interface InquiryItem {
  createdDate: string;
  inquiryId: number;
  optionName: string;
  productId: number;
  studioName: string;
  thumbnailUrl: string;
}

export interface InquiryStudioReq {
  title: string;
  content: string;
  email: string;
}

export interface InquiryServiceReq {
  type: string;
  content: string;
  email: string;
}

export interface InquiryStudio {
  content: string;
  createdDate: string;
  inquiryId: number;
  title: string;
}

export type InquiryListResponse = ApiResponse<PagedResponse<InquiryItem>>;

export type InquiryStudioListResponse = ApiResponse<PagedResponse<InquiryStudio>>;
