'use client';

import { ImageType, ProductOptionType, ProductFormDataType } from '@/admin/_types/product';
import { getMineProduct, getProduct, patchProduct, postProduct } from '@/admin/_services/product';
import { productIdStore } from '@/admin/_stores/productIdStore';
import { getStorage } from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const MAX_SUB_IMAGE_COUNT = 4;
const MAX_ADD_IMAGE_COUNT = 5;

/**
 * 서버로 전송할 subImagesFinal 액션 타입 정의
 */
type SubImageFinalAction =
  | { action: 'KEEP'; index: number; imageId: number | null }
  | { action: 'DELETE'; index: number; imageId: number }
  | { action: 'UPLOAD'; index: number; imageId: null };

/**
 * 서버로 전송할 additionalImagesFinal 액션 타입 정의
 */
type AdditionalImageFinalAction =
  | { action: 'KEEP'; imageId: number | null }
  | { action: 'DELETE'; imageId: number }
  | { action: 'UPLOAD'; imageId: null };

export const useProduct = (studioId: string | null, productId: string | undefined) => {
  const { setProductId } = productIdStore();
  const router = useRouter();
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const storedToken = getStorage('adminAccessToken') || '';
    setToken(storedToken);
  }, []);

  const methods = useForm<ProductFormDataType>({
    defaultValues: {
      productId: undefined,
      productType: 'WEDDING_SNAP',
      shootingPlace: 'JEJU',
      availableSeasons: [],
      cameraTypes: [],
      retouchStyles: [],
      mainImage: {},
      subImages: [],
      title: '',
      additionalImages: [],
      createdAt: '',
      updatedAt: '',
      options: [
        {
          productId: undefined,
          optionId: null,
          name: '',
          optionType: 'SINGLE',
          discountAvailable: false,
          originalPrice: 0,
          discountPrice: undefined,
          description: '',
          costumeCount: 0,
          shootingLocationCount: 0,
          shootingHours: 0,
          shootingMinutes: 0,
          retouchedCount: 0,
          originalProvided: false,
          additionalInfo: '',
          partnerShops: [
            {
              category: undefined,
              name: '',
              link: '',
            },
          ],
        },
      ],
    },
  });

  const { reset, control, trigger, handleSubmit, watch } = methods;

  const fetchProduct = useCallback(async () => {
    if (!token) return;

    if (!productId) {
      const { data: responseMineData } = await getMineProduct(token);
      if (responseMineData.length === 0) return;
      const mine = responseMineData.data[0];
      if (mine?.productId) {
        setProductId(mine.productId);
        router.push(`/admin/product?studioId=${studioId}&productId=${mine.productId}`);
        reset({
          ...mine,
          subImages: mine.subImages?.map((img: ImageType) => ({ ...img, action: 'KEEP' })) || [],
          additionalImages: mine.additionalImages?.map((img: ImageType) => ({ ...img, action: 'KEEP' })) || [],
          options: mine.data.options.map((option: ProductOptionType) => ({
            ...option,
            discountAvailable: option.discountAvailable ? 'true' : 'false',
            originalProvided: option.originalProvided ? 'true' : 'false',
          })),
        });
      }
    } else {
      try {
        const { data: responseData } = await getProduct(token, productId);
        reset({
          ...responseData.data,
          subImages: responseData.data.subImages?.map((img: ImageType) => ({ ...img, action: 'KEEP' })) || [],
          additionalImages:
            responseData.data.additionalImages?.map((img: ImageType) => ({ ...img, action: 'KEEP' })) || [],
          options: responseData.data.options.map((option: ProductOptionType) => ({
            ...option,
            discountAvailable: option.discountAvailable ? 'true' : 'false',
            originalProvided: option.originalProvided ? 'true' : 'false',
          })),
        });
      } catch (error) {
        console.error('상품 불러오기 실패:', error);
        alert('상품 정보를 불러오는 데 실패했습니다.');
      }
    }
  }, [productId, reset, token, setProductId, router, studioId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const {
    fields: optionFields,
    append: optionAppend,
    remove: optionRemove,
  } = useFieldArray({
    control,
    name: 'options',
  });

  const onSubmit = async (data: ProductFormDataType) => {
    const formData = new FormData();

    if (!productId) {
      // 신규 등록 로직
      const productInfo = {
        shootingPlace: data.shootingPlace,
        availableSeasons: data.availableSeasons,
        productType: data.productType,
        retouchStyles: data.retouchStyles,
        studioId: Number(studioId),
        cameraTypes: data.cameraTypes,
        title: data.title,
        options: data.options.map(option => ({
          ...option,
          discountAvailable: option.discountAvailable === 'true' ? true : false,
          originalProvided: option.originalProvided === 'true' ? true : false,
          discountPrice:
            option.discountPrice === 0 || option.discountAvailable === 'false'
              ? option.originalPrice
              : option.discountPrice,
          partnerShops: option.optionType === 'SINGLE' ? [] : option.partnerShops,
        })),
      };

      formData.append('request', new Blob([JSON.stringify(productInfo)], { type: 'application/json' }));
      formData.append('mainImageFile', data.mainImageFile!);
      data.subImageFiles?.forEach(file => formData.append('subImageFiles', file));
      data.additionalImageFiles?.forEach(file => formData.append('additionalImageFiles', file));

      console.log(data);

      try {
        const { data: productData } = await postProduct({ token, body: formData });
        alert('상품 등록에 성공했습니다.');
        setProductId(productData.data.productId);
        router.push(`/admin/product?studioId=${studioId}&productId=${productData.data.productId}`);
      } catch (error) {
        console.error(error, '상품 등록 실패');
        alert('상품 등록에 실패했습니다. 필수 항목을 모두 입력했는지 확인해주세요.');
      }
    } else {
      // 수정 로직
      const subImagesFinal: SubImageFinalAction[] = data.subImages!.flatMap((img, index) => {
        const actions: SubImageFinalAction[] = [];

        if (img.action === 'KEEP') {
          actions.push({ action: 'KEEP', index, imageId: img.imageId ?? null });
        }

        if (img.action === 'DELETE') {
          if (typeof img.imageId === 'number') {
            actions.push({ action: 'DELETE', index, imageId: img.imageId });
          }
        }

        if (img.action === 'UPLOAD') {
          // 기존 이미지를 교체하는 경우
          if ('deletedImageId' in img && typeof img.deletedImageId === 'number') {
            actions.push({ action: 'DELETE', index, imageId: img.deletedImageId });
            actions.push({ action: 'UPLOAD', index, imageId: null });
          } else {
            // 빈 슬롯에 새로 업로드한 경우
            actions.push({ action: 'UPLOAD', index, imageId: null });
          }
        }

        return actions;
      });

      const additionalImagesFinal: AdditionalImageFinalAction[] = data.additionalImages!.flatMap(img => {
        const actions: AdditionalImageFinalAction[] = [];

        if (img.action === 'KEEP') {
          actions.push({ action: 'KEEP', imageId: img.imageId ?? null });
        }

        if (img.action === 'DELETE') {
          if (typeof img.imageId === 'number') {
            actions.push({ action: 'DELETE', imageId: img.imageId });
          }
        }

        if (img.action === 'UPLOAD') {
          actions.push({ action: 'UPLOAD', imageId: null });
        }

        return actions;
      });

      const productInfo = {
        productId: Number(productId),
        studioId: Number(studioId),
        productType: data.productType,
        shootingPlace: data.shootingPlace,
        title: data.title,
        availableSeasons: data.availableSeasons,
        cameraTypes: data.cameraTypes,
        retouchStyles: data.retouchStyles,
        subImagesFinal,
        additionalImagesFinal,
      };

      const optionsInfo = data.options.map(option => ({
        ...option,
        discountAvailable: option.discountAvailable === 'true' ? true : false,
        originalProvided: option.originalProvided === 'true' ? true : false,
        discountPrice:
          option.discountPrice === 0 || option.discountAvailable === 'false'
            ? option.originalPrice
            : option.discountPrice,
        partnerShops: option.optionType === 'SINGLE' ? [] : option.partnerShops,
      }));

      formData.append('request', new Blob([JSON.stringify(productInfo)], { type: 'application/json' }));
      formData.append('options', new Blob([JSON.stringify(optionsInfo)], { type: 'application/json' }));

      if (data.mainImageFile) {
        formData.append('mainImageFile', data.mainImageFile);
      }
      data.subImageFiles?.forEach(file => formData.append('subImageFiles', file));
      data.additionalImageFiles?.forEach(file => formData.append('additionalImageFiles', file));

      try {
        const { data: updatedProduct } = await patchProduct({
          token,
          productId,
          body: formData,
        });

        alert('상품 수정에 성공했습니다.');
        reset({
          ...updatedProduct.data,
          subImages:
            updatedProduct.data.subImages?.map((img: ImageType) => ({
              ...img,
              action: 'KEEP',
            })) || [],
          additionalImages:
            updatedProduct.data.additionalImages?.map((img: ImageType) => ({
              ...img,
              action: 'KEEP',
            })) || [],
          options: updatedProduct.data.options?.map((option: ProductOptionType) => ({
            ...option,
            discountAvailable: option.discountAvailable ? 'true' : 'false',
            originalProvided: option.originalProvided ? 'true' : 'false',
          })),
        });
      } catch (error) {
        console.error('상품 수정 실패:', error);
        alert('상품 수정에 실패했습니다. 필수 항목을 모두 입력했는지 확인해주세요.');
      }
    }
  };

  const handleSubmitWrapper = async () => {
    const isValid = await trigger();

    // 서브 이미지(4장) 검사
    const subImageArray: ImageType[] = watch('subImages') || [];
    const activeSubCount = subImageArray.filter(img => img.action !== 'DELETE').length;
    if (activeSubCount !== MAX_SUB_IMAGE_COUNT) {
      alert(`서브 이미지 등록은 ${MAX_SUB_IMAGE_COUNT}장이 필수입니다.`);
      return;
    }

    // 추가 이미지(5장) 검사
    const addImageArray: ImageType[] = watch('additionalImages') || [];
    const activeAddCount = addImageArray.filter(img => img.action !== 'DELETE').length;
    if (activeAddCount !== MAX_ADD_IMAGE_COUNT) {
      alert(`추가 이미지 등록은 ${MAX_ADD_IMAGE_COUNT}장이 필수입니다.`);
      return;
    }

    if (!isValid) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    handleSubmit(onSubmit)();
  };

  return {
    ...methods,
    handleSubmitWrapper,
    optionFields,
    optionAppend,
    optionRemove,
  };
};
