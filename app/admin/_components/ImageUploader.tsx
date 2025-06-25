'use client';

import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { ImageType } from '../_types/product';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';
import RequirdField from './RequirdField';

const MAX_SUB_IMAGE_COUNT = 4;
const MAX_ADD_IMAGE_COUNT = 5;

const compressionOptions = {
  maxSizeMB: 0.4,
  maxWidthOrHeight: 960,
  useWebWorker: true,
};

const ImageUploader = () => {
  const { watch, setValue } = useFormContext();

  const mainImage = (watch('mainImage') ?? { imageId: undefined, url: '', action: 'KEEP' }) as ImageType;
  const subImages: ImageType[] = watch('subImages') || [];
  const subImageFiles: File[] = watch('subImageFiles') || [];
  const additionalImages: ImageType[] = watch('additionalImages') || [];
  const additionalImageFiles: File[] = watch('additionalImageFiles') || [];

  const mainInputRef = useRef<HTMLInputElement>(null);
  const subInputRef = useRef<HTMLInputElement>(null);
  const addInputRef = useRef<HTMLInputElement>(null);

  const showSubImageLimitAlert = () => {
    alert(`서브 이미지는 최대 ${MAX_SUB_IMAGE_COUNT}장까지 업로드할 수 있습니다.`);
  };

  const showAddImageLimitAlert = () => {
    alert(`추가 이미지는 최대 ${MAX_ADD_IMAGE_COUNT}장까지 업로드할 수 있습니다.`);
  };

  /** 대표 이미지 변경 */
  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const compressedFile = await imageCompression(file, compressionOptions);
    const previewUrl = URL.createObjectURL(compressedFile);

    setValue('mainImageFile', compressedFile);
    setValue('mainImage', { imageId: null, url: previewUrl, action: 'UPLOAD' });
    e.target.value = '';
  };

  /** 서브 이미지 변경 */
  const handleSubImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // 1) “현재 남아있는(= action !== 'DELETE') 서브 이미지 개수” 계산
    const activeCount = subImages.filter(img => img.action !== 'DELETE').length;
    const remainingSlots = MAX_SUB_IMAGE_COUNT - activeCount;

    if (remainingSlots <= 0) {
      showSubImageLimitAlert();
      e.target.value = '';
      return;
    }

    // 2) 실제 처리할 파일 수(남은 슬롯 수만큼)
    const filesToProcess = files.slice(0, remainingSlots);
    const compressedFiles = await Promise.all(filesToProcess.map(file => imageCompression(file, compressionOptions)));

    // 3) 기존 subImages 배열 복사 (삭제 상태 or KEEP 상태 그대로 가져오기)
    const updatedSubImages: (ImageType | undefined)[] = [...subImages];

    // 4) “DELETE” 상태인 슬롯을 우선 채우기
    const updatedSubImageFiles: File[] = [...subImageFiles];
    for (let i = 0; i < updatedSubImages.length && compressedFiles.length > 0; i++) {
      const current = updatedSubImages[i];
      if (current?.action === 'DELETE') {
        const file = compressedFiles.shift()!;
        updatedSubImages[i] = {
          imageId: null,
          url: URL.createObjectURL(file),
          action: 'UPLOAD',
          deletedImageId: current.imageId,
          deletedIndex: i,
        };
        updatedSubImageFiles.push(file);
      }
    }

    // 5) 새롭게 빈 슬롯(undefined)을 채우기 (초기 등록 시 length < MAX)
    for (let i = 0; i < MAX_SUB_IMAGE_COUNT && compressedFiles.length > 0; i++) {
      if (updatedSubImages[i] === undefined) {
        const file = compressedFiles.shift()!;
        updatedSubImages[i] = {
          imageId: null,
          url: URL.createObjectURL(file),
          action: 'UPLOAD',
        };
        updatedSubImageFiles.push(file);
      }
    }

    // 6) setValue로 form state 갱신
    setValue(
      'subImages',
      // 타입 안정성을 위해 undefined는 제거하고 ImageType[]으로 강제 변환
      updatedSubImages.filter((img): img is ImageType => img !== undefined)
    );
    setValue('subImageFiles', updatedSubImageFiles);
    e.target.value = '';
  };

  /** 추가 이미지 변경 */
  const handleAdditionalImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // 1) “현재 남아있는(= action !== 'DELETE') 추가 이미지 개수” 계산
    const activeCount = additionalImages.filter(img => img.action !== 'DELETE').length;
    const remainingSlots = MAX_ADD_IMAGE_COUNT - activeCount;

    if (remainingSlots <= 0) {
      showAddImageLimitAlert();
      e.target.value = '';
      return;
    }

    // 2) 실제 처리할 파일만 남기기
    const filesToAdd = files.slice(0, remainingSlots);
    const compressedFiles = await Promise.all(filesToAdd.map(file => imageCompression(file, compressionOptions)));

    // 3) preview 정보 생성
    const previews: ImageType[] = compressedFiles.map(file => ({
      imageId: undefined,
      url: URL.createObjectURL(file),
      action: 'UPLOAD',
    }));

    // 4) form state에 추가
    setValue('additionalImageFiles', [...additionalImageFiles, ...compressedFiles]);
    setValue('additionalImages', [...additionalImages, ...previews]);
    e.target.value = '';
  };

  /** 이미지 삭제 */
  const handleRemoveImage = (type: 'main' | 'sub' | 'add', index?: number) => {
    if (type === 'main') {
      if (mainImage?.url?.startsWith('blob:')) {
        URL.revokeObjectURL(mainImage.url);
      }
      setValue('mainImageFile', undefined);
      setValue('mainImage', { imageId: mainImage.imageId, url: '', action: 'DELETE' });
    } else if (type === 'sub' && typeof index === 'number') {
      const removed = subImages[index];
      if (removed?.url?.startsWith('blob:')) {
        URL.revokeObjectURL(removed.url);
        // client에 업로드된 File 객체만 제거
        setValue(
          'subImageFiles',
          subImageFiles.filter((_, i) => i !== index)
        );
      }
      // 해당 슬롯(action을 DELETE로 변경)
      setValue(
        'subImages',
        subImages.map((img, i) => (i === index ? { ...img, action: 'DELETE', imageId: img.imageId, url: '' } : img))
      );
    } else if (type === 'add' && typeof index === 'number') {
      const removed = additionalImages[index];
      if (removed?.url?.startsWith('blob:')) {
        URL.revokeObjectURL(removed.url);
        setValue(
          'additionalImageFiles',
          additionalImageFiles.filter((_, i) => i !== index)
        );
      }
      setValue(
        'additionalImages',
        additionalImages.map((img, i) => (i === index ? { ...img, action: 'DELETE', imageId: img.imageId } : img))
      );
    }
  };

  return (
    <>
      {/* 대표 이미지 */}
      <div className="mb-6">
        <RequirdField>대표 이미지 (1장)</RequirdField>
        <input type="file" onChange={handleMainImageChange} ref={mainInputRef} className="hidden" accept="image/*" />
        <label
          onClick={() => mainInputRef.current?.click()}
          className="block w-full cursor-pointer rounded-md border border-dashed border-black py-6 text-center"
        >
          파일 추가
        </label>
        {mainImage?.url && (
          <div className="relative mt-2 h-32 w-32">
            <Image src={mainImage.url} alt="Main Image" fill sizes="128px" style={{ objectFit: 'cover' }} />
            <button
              type="button"
              className="absolute right-0 top-0 h-6 w-6 rounded-full bg-red-600 text-xs text-white"
              onClick={() => handleRemoveImage('main')}
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* 서브 이미지 */}
      <div className="mb-6">
        <RequirdField>서브 이미지 (4장)</RequirdField>
        <input
          type="file"
          multiple
          ref={subInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleSubImagesChange}
        />
        <label
          onClick={() => subInputRef.current?.click()}
          className="block w-full cursor-pointer rounded-md border border-dashed border-black py-6 text-center"
        >
          파일 추가
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {subImages.map(
            (img, index) =>
              img.action !== 'DELETE' && (
                <div key={index} className="relative h-24 w-24">
                  <Image
                    src={img.url}
                    alt={`Sub Image ${index + 1}`}
                    fill
                    sizes="96px"
                    style={{ objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage('sub', index)}
                    className="absolute right-0 top-0 h-5 w-5 rounded-full bg-red-600 text-xs text-white"
                  >
                    ×
                  </button>
                </div>
              )
          )}
        </div>
      </div>

      {/* 추가 이미지 */}
      <div className="mb-6">
        <label className="mb-1 block">추가 이미지 (5장)</label>
        <input
          type="file"
          multiple
          ref={addInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleAdditionalImagesChange}
        />
        <label
          onClick={() => addInputRef.current?.click()}
          className="block w-full cursor-pointer rounded-md border border-dashed border-black py-6 text-center"
        >
          파일 추가
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {additionalImages.map(
            (img, index) =>
              img.action !== 'DELETE' && (
                <div key={index} className="relative h-24 w-24">
                  <Image
                    src={img.url}
                    alt={`Additional Image ${index + 1}`}
                    fill
                    sizes="96px"
                    style={{ objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage('add', index)}
                    className="absolute right-0 top-0 h-5 w-5 rounded-full bg-red-600 text-xs text-white"
                  >
                    ×
                  </button>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default ImageUploader;
