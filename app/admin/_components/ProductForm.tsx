'use client';

import { FormProvider } from 'react-hook-form';
import { AVAILBLE_PREIODS, CAMERATYPE, CORRECTION_STYLES } from '../_constants/product';
import { useProduct } from '../_hooks/product/useProduct';
import ProductPackageOption from '@/admin/_components/ProductPackageOption';
import ProductSingleOption from '@/admin/_components/ProductSingleOption';
import ImageUploader from './ImageUploader';

interface ProductFormProps {
  studioId: string | null;
  productId: string | undefined;
}

const ProductForm = ({ studioId, productId }: ProductFormProps) => {
  const methods = useProduct(studioId, productId);
  const {
    register,
    watch,
    formState: { errors },
    optionFields,
    optionAppend,
    optionRemove,
    handleSubmitWrapper,
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmitWrapper();
        }}
      >
        <section className="mx-auto w-full space-y-10 rounded-md border p-6 text-[1.2rem] font-semibold text-[#000000]">
          {/* 상품 유형 + 촬영 장소 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block">
                상품 유형 <span className="text-[#FF0000]">*</span>
              </label>
              <select
                {...register('productType', { required: true })}
                className="w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
              >
                <option value="WEDDING_SNAP">웨딩스냅</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block">
                촬영 장소 <span className="text-[#FF0000]">*</span>
              </label>
              <select
                {...register('shootingPlace', { required: true })}
                className="w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
              >
                <option value="JEJU">제주</option>
              </select>
            </div>
          </div>

          {/* 촬영 가능 시기 */}
          <div>
            <label className="mb-1 block">
              촬영 가능 시기 <span className="text-[#FF0000]">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {Object.entries(AVAILBLE_PREIODS).map(([label, value], index) => {
                return (
                  <label key={index} className="inline-flex items-center gap-2 text-sm font-medium text-[#5C667B]">
                    <input
                      {...register('availableSeasons', { required: true })}
                      value={value}
                      type="checkbox"
                      className="h-4 w-4 rounded border border-[#C6CDD5] text-black focus:ring-1 focus:ring-[#D8DDE3]"
                    />
                    <span className="text-[1.2rem]">{label}</span>
                  </label>
                );
              })}
            </div>
            {errors.availableSeasons && <p className="text-red-500">필수 선택</p>}
          </div>

          {/* 카메라 종류 */}
          <div>
            <label className="mb-1 block">
              카메라 종류 <span className="text-[#FF0000]">*</span>
            </label>
            <div className="flex gap-4">
              {Object.entries(CAMERATYPE).map(([label, value], index) => {
                return (
                  <label key={index} className="inline-flex items-center gap-2 text-sm font-medium text-[#5C667B]">
                    <input
                      {...register('cameraTypes', { required: true })}
                      type="checkbox"
                      value={value}
                      className="h-4 w-4 rounded border border-[#C6CDD5] text-black focus:ring-1 focus:ring-[#D8DDE3]"
                    />
                    <span className="text-[1.2rem]">{label}</span>
                  </label>
                );
              })}
            </div>
            {errors.cameraTypes && <p className="text-red-500">필수 선택</p>}
          </div>

          {/* 보정 스타일 */}
          <div>
            <label className="mb-1 block">
              보정 스타일 <span className="text-[#FF0000]">*</span>
            </label>
            <div className="grid grid-cols-4 gap-2 md:grid-cols-5">
              {Object.entries(CORRECTION_STYLES).map(([label, value], index) => {
                return (
                  <label key={index} className="inline-flex items-center gap-2 text-sm font-medium text-[#5C667B]">
                    <input
                      {...register('retouchStyles', { required: true })}
                      value={value}
                      type="checkbox"
                      className="h-4 w-4 rounded border border-[#C6CDD5] text-black focus:ring-1 focus:ring-[#D8DDE3]"
                    />
                    <span className="text-[1.2rem]">{label}</span>
                  </label>
                );
              })}
            </div>
            {errors.retouchStyles && <p className="text-red-500">필수 선택</p>}
          </div>

          {/* 이미지 업로드 영역 */}
          <ImageUploader />
        </section>

        <section>
          <header className="mb-[1rem] text-[2.4rem] font-semibold text-[#000000]">상품 옵션</header>
          {optionFields.map((_, index) =>
            watch(`options.${index}.optionType`) === 'SINGLE' ? (
              <section className="mb-10" key={index}>
                <ProductSingleOption index={index} optionAppend={optionAppend} optionRemove={optionRemove} />
              </section>
            ) : (
              <section className="mb-10" key={index}>
                <ProductPackageOption index={index} optionAppend={optionAppend} optionRemove={optionRemove} />
              </section>
            )
          )}
        </section>

        {/* 버튼 */}
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" className="rounded bg-[#E0E0E0] px-4 py-2 text-black">
            취소
          </button>
          <button type="submit" className="rounded bg-[#3F3F3F] px-4 py-2 text-white">
            등록
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProductForm;
