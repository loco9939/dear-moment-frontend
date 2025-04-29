'use client';

import { getStudio, patchStudio, postStudio } from '@/admin/_services/studio';
import { studioIdStore } from '@/admin/_stores/studioIdStore';
import { StudioFormDataType } from '@/admin/_types/studio';
import { getStorage } from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export const useStudio = (studioId: string | null) => {
  const { setStudioId } = studioIdStore();
  const router = useRouter();

  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const storedToken = getStorage('adminAccessToken') || '';
    setToken(storedToken);
  }, []);

  const methods = useForm<StudioFormDataType>({
    defaultValues: {
      status: 'ACTIVE',
      isCasted: 'true',
      name: '',
      contact: '',
      studioIntro: '',
      artistsIntro: '',
      instagramUrl: '',
      kakaoChannelUrl: '',
      reservationNotice: '',
      cancellationPolicy: '',
      partnerShops: [
        {
          category: undefined,
          name: '',
          urlLink: '',
        },
      ],
    },
  });

  const { reset, control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'partnerShops',
  });

  const fetchStudio = useCallback(async () => {
    if (!studioId || !token) return;
    try {
      const { data: responseData } = await getStudio(token, studioId);
      reset({
        ...responseData.data,
        isCasted: responseData.data.isCasted === true ? 'true' : 'false',
      });
    } catch (error) {
      console.error('스튜디오 불러오기 실패:', error);
    }
  }, [studioId, token, reset]);

  useEffect(() => {
    fetchStudio();
  }, [fetchStudio]);

  const onSubmit = async (data: StudioFormDataType) => {
    if (!studioId) {
      try {
        const { data: studioData } = await postStudio({
          token,
          body: { ...data, isCasted: data.isCasted === 'true' ? true : false },
        });
        alert('스튜디오 등록에 성공했습니다.');

        router.push(`/admin/studio?studioId=${studioData.data.id}`);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const { data: studioIdData } = await patchStudio({
          token,
          body: { ...data, isCasted: data.isCasted === 'true' ? true : false },
          studioId,
        });
        alert('스튜디오 수정에 성공했습니다.');
        setStudioId(studioIdData.data.id);
        router.push(`/admin/studio?studioId=${studioIdData.data.id}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return {
    fetchStudio,
    ...methods,
    onSubmit,
    fields,
    append,
    remove,
  };
};
