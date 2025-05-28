import { getStorage } from '@/utils/localStorage';

export const getClientToken = (): string | null => {
  const token = getStorage('accessToken');
  return token;
};
