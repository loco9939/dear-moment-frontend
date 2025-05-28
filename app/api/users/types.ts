export type Sex = 'FEMALE' | 'MALE';

export interface patchUserReq {
  name: string;
  isStudio: boolean;
  birthDate: string;
  sex: Sex;
  addInfoIsSkip: boolean;
}

export interface UserRes {
  id: string;
  loginId: string;
  name: string;
  isStudio: boolean;
  birthDate: string;
  sex: Sex;
  createdAt: string;
  updatedAt: string;
}
