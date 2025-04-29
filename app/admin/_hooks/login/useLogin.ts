'use client';

import { getProfile, login } from '@/admin/_services/user';
import { studioIdStore } from '@/admin/_stores/studioIdStore';
import { LoginFormDataType } from '@/admin/_types/login';
import { setStorage } from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export const useLogin = () => {
  const { setStudioId } = studioIdStore();
  const router = useRouter();

  const methods = useForm<LoginFormDataType>({
    defaultValues: {
      loginId: '',
      password: '',
    },
  });

  // TODO : 미들웨어 설정으로 토큰값 없을 시 studio, product 못 들어가도록 막기
  const onSubmit = async (data: LoginFormDataType) => {
    try {
      const loginResponse = await login(data);
      setStorage('adminAccessToken', loginResponse.token);

      const { data: userData } = await getProfile(loginResponse.token);
      const studioId = userData.data.studioId;
      if (studioId) {
        setStudioId(studioId);
        router.push(`/admin/studio?studioId=${studioId}`);
      } else {
        router.push('/admin/studio');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    ...methods,
    onSubmit,
  };
};
