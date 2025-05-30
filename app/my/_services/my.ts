import { getStorage } from '@/utils/localStorage';

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
}

export const getMyInfo = async (): Promise<{ data: userInfo }> => {
  // const cookiesStore = await cookies();
  // const token = cookiesStore.get('accessToken')?.value || '';

  const token = getStorage('accessToken') || '';

  if (!token) {
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

  const data = await response.json();

  return { data };
};
