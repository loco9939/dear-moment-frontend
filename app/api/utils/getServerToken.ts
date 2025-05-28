'use server';

import { cookies } from 'next/headers';

export const getServerToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value || '';
  return token;
};
