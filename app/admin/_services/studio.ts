import { StudioFormDataType } from '@/admin/_types/studio';

export const postStudio = async ({ token, body }: { token: string; body: StudioFormDataType }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/studios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...body }),
  });

  if (!response.ok) {
    throw new Error('스튜디오 등록 실패');
  }

  const data = await response.json();

  return { data };
};

export const patchStudio = async ({
  token,
  body,
  studioId,
}: {
  token: string;
  body: StudioFormDataType;
  studioId: string;
}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/studios/${studioId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...body }),
  });

  if (!response.ok) {
    throw new Error('스튜디오 수정 실패');
  }

  const data = await response.json();

  return { data };
};

export const getStudio = async (token: string, studioId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/studios/${studioId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('스튜디오 정보 조회 실패');
  }

  const data = await response.json();

  return { data };
};
