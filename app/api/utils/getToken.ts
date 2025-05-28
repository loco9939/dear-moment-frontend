import { getClientToken } from './getClientToken';
import { getServerToken } from './getServerToken';

export const getToken = async () => {
  // 서버 사이드에서는 getServerToken을 사용
  if (typeof window === 'undefined') {
    const serverToken = await getServerToken();
    return serverToken;
  }
  // 클라이언트 사이드에서는 getClientToken을 사용
  const clientToken = getClientToken();
  return clientToken;
};
