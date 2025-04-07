import { ApiResponse } from '../common/types';

interface AddLikeSuccess {
  likeId: number;
}

export type AddLikeResponse = ApiResponse<AddLikeSuccess>;

export interface RemoveLikeRequest {
  likeId: number;
  productId: number;
}

export type RemoveLikeResponse = ApiResponse<null>;
