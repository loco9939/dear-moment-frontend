import { getStorage } from '@/utils/localStorage';
import { checkTokenExpiration } from '@/utils/auth';
import { searchLikeStudioList, searchLikeOptionList } from '../../api/likes';

export interface userInfo {
  id: string;
  loginId: string;
  name: string;
  studioId: number | null;
  birthDate: string | null;
  sex: string | null;
  createdAt: string;
  updatedAt: string | null;
  addInfoIsSkip: boolean;
  likeStudioCount: number;
  likeProductCount: number;
}

export interface deleteUserInfo {
  reasonCode: number;
  customReason: string;
}

export const getMyInfo = async (): Promise<{ data: userInfo }> => {
  // const cookiesStore = await cookies();
  // const token = cookiesStore.get('accessToken')?.value || '';

  const token = getStorage('accessToken') || '';

  if (!token) {
    checkTokenExpiration();
    throw new Error('토큰이 없습니다.');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('내 정보 조회 실패');
  }

  const userData = await response.json();

  // 찜한 스튜디오와 상품 개수 조회
  const [studioData, productData] = await Promise.all([searchLikeStudioList(0, 10), searchLikeOptionList(0, 10)]);

  return {
    data: {
      ...userData.data,
      likeStudioCount: studioData?.data.content.length || 0,
      likeProductCount: productData?.data.content.length || 0,
    },
  };
};

export const deleteUserInfo = async (data: deleteUserInfo): Promise<{ data: { message: string } }> => {
  const token = getStorage('accessToken') || '';
  if (!token) {
    checkTokenExpiration();
    throw new Error('토큰이 없습니다.');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth/kakao/withdraw`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('탈퇴 실패');
  }

  return { data: { message: '탈퇴 완료' } };
};
