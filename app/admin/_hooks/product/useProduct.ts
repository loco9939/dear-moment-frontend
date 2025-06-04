'use client';

import { ImageType, ProductOptionType, ProductFormDataType } from '@/admin/_types/product';
import { getMineProduct, getProduct, patchProduct, postProduct } from '@/admin/_services/product';
import { productIdStore } from '@/admin/_stores/productIdStore';
import { getStorage } from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

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
          partnerShops: [
            {
              category: 'WEDDING_SHOP',
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
    if (!token) return; // token이 없으면 중단

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
      const productInfo = {
        shootingPlace: data.shootingPlace,
        availableSeasons: data.availableSeasons,
        productType: data.productType,
        retouchStyles: data.retouchStyles,
        // contactInfo: 'test contactInfo',
        studioId: Number(studioId),
        cameraTypes: data.cameraTypes,
        // title: 'test',
        // description: 'test 설명',
        // detailedInfo: 'test 상세 설명',
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
      const subImagesFinal = data.subImages!.flatMap((img, index) => {
        const actions = [];

        if (img.action === 'UPLOAD' && 'deletedImageId' in img && img.deletedImageId) {
          actions.push({ action: 'DELETE', index, imageId: img.deletedImageId });
          actions.push({ action: 'UPLOAD', index, imageId: null });
          return actions;
        }

        if (img.action === 'KEEP') {
          actions.push({ action: 'KEEP', index, imageId: img.imageId });
        }

        if (img.action === 'UPLOAD' && !('deletedImageId' in img)) {
          console.warn('UPLOAD만 존재하는 잘못된 상태입니다. 서버가 거부할 수 있습니다.');
        }

        return actions;
      });

      const additionalImagesFinal = data.additionalImages!.flatMap(img => {
        const actions = [];

        if (img.action === 'KEEP') {
          actions.push({ action: 'KEEP', imageId: img.imageId });
        }

        if (img.action === 'DELETE') {
          actions.push({ action: 'DELETE', imageId: img.imageId });
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
        // title: 'test',
        // description: 'test 설명',
        // detailedInfo: 'test 상세 설명',
        availableSeasons: data.availableSeasons,
        cameraTypes: data.cameraTypes,
        retouchStyles: data.retouchStyles,
        // contactInfo: '010-1234-5678',
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
          subImages: updatedProduct.data.subImages?.map((img: ImageType) => ({ ...img, action: 'KEEP' })) || [],
          additionalImages:
            updatedProduct.data.additionalImages?.map((img: ImageType) => ({ ...img, action: 'KEEP' })) || [],
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
    const subImageArray = watch('subImages') || [];

    if (subImageArray.length !== 4) {
      alert('서브 이미지 등록은 4장이 필수입니다.');
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
