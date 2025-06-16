import { UseFieldArrayAppend, UseFieldArrayRemove, useFormContext, useWatch } from 'react-hook-form';
import { ProductFormDataType } from '../_types/product';
import Plus from '../../assets/icons/svg/plus_circle.svg';
import Minus from '../../assets/icons/svg/minus_circle.svg';
import { useEffect, useState } from 'react';
import { discountPercent } from '../_utils/discountPercent';
import RequirdField from './RequirdField';

interface ProductSingleOptionProps {
  index: number;
  optionAppend: UseFieldArrayAppend<ProductFormDataType, 'options'>;
  optionRemove: UseFieldArrayRemove;
}

const ProductSingleOption = ({ index, optionAppend, optionRemove }: ProductSingleOptionProps) => {
  const { register, control } = useFormContext();
  const [discount, setDiscount] = useState(0);

  const originalPrice = useWatch({
    control,
    name: `options.${index}.originalPrice`,
  });
  const discountPrice = useWatch({
    control,
    name: `options.${index}.discountPrice`,
  });

  useEffect(() => {
    if (
      typeof originalPrice === 'number' &&
      typeof discountPrice === 'number' &&
      originalPrice > 0 &&
      discountPrice > 0 &&
      discountPrice <= originalPrice
    ) {
      const discountPercentValue = discountPercent(originalPrice, discountPrice);
      setDiscount(discountPercentValue);
    } else {
      setDiscount(0);
    }
  }, [originalPrice, discountPrice]);

  const discountAvailableValue = useWatch({
    control,
    name: `options.${index}.discountAvailable`,
  });
  const isDiscountAvailable = discountAvailableValue === 'true';

  return (
    <div className="mx-auto w-full space-y-10 rounded-md border p-6 text-[1.2rem] font-semibold text-[#000000]">
      {/* 버튼 */}
      <section className="flex justify-end gap-2">
        <button
          onClick={() =>
            optionAppend({
              optionId: null,
              name: '',
              optionType: 'SINGLE',
              discountAvailable: false,
              originalPrice: 0,
              discountPrice: 0,
              description: '',
              costumeCount: 0,
              shootingLocationCount: 0,
              shootingHours: 0,
              shootingMinutes: 0,
              retouchedCount: 0,
              partnerShops: [
                {
                  category: undefined,
                  name: '',
                  link: '',
                },
              ],
            })
          }
          type="button"
          className="flex items-center justify-center"
        >
          <Plus width={16.5} height={16.5} />
        </button>
        {index > 0 && (
          <button
            onClick={() => optionRemove(index)}
            type="button"
            disabled={index === 0}
            className="flex items-center justify-center"
          >
            <Minus width={16.5} height={16.5} />
          </button>
        )}
      </section>
      {/* 옵션 종류 + 옵션명 */}
      <div className="grid grid-cols-3 items-center gap-4">
        <div className="flex items-center gap-4">
          <RequirdField>옵션 종류</RequirdField>
          <label className="inline-flex items-center gap-1">
            <input value="SINGLE" {...register(`options.${index}.optionType`, { required: true })} type="radio" />
            단품
          </label>
          <label className="inline-flex items-center gap-1">
            <input value="PACKAGE" {...register(`options.${index}.optionType`, { required: true })} type="radio" />
            패키지
          </label>
        </div>
        <div className="flex items-center gap-4">
          <RequirdField className={'shrink-0'}>옵션명</RequirdField>
          <input
            {...register(`options.${index}.name`, { required: true })}
            type="text"
            className="w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
          />
        </div>
      </div>

      {/* 할인 여부 */}
      <div className="flex items-center gap-4">
        <RequirdField>할인 여부</RequirdField>
        <label className="inline-flex items-center gap-1">
          <input value="true" type="radio" {...register(`options.${index}.discountAvailable`, { required: true })} />
          할인 있음
        </label>
        <label className="inline-flex items-center gap-1">
          <input value="false" type="radio" {...register(`options.${index}.discountAvailable`, { required: true })} />
          할인 없음
        </label>
      </div>

      {/* 가격 정보 */}
      <div className="grid grid-cols-3 items-center gap-4">
        <div>
          <RequirdField>원 판매가</RequirdField>
          <div className="flex items-center gap-1">
            <input
              {...register(`options.${index}.originalPrice`, { required: true, valueAsNumber: true })}
              type="number"
              className="w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
            />
            <span>원</span>
          </div>
        </div>
        <div>
          <label className="font-medium">할인가</label>
          <div className="flex items-center gap-1">
            <input
              {...register(`options.${index}.discountPrice`, { valueAsNumber: true })}
              type="number"
              className="w-full rounded border bg-gray-100 p-2"
              disabled={!isDiscountAvailable}
            />
            <span className="text-sm text-gray-500">({discount}% 할인)</span>
          </div>
        </div>
      </div>

      {/* 촬영 장소 / 시간 */}
      <div className="grid grid-cols-3 items-center gap-4">
        <div>
          <RequirdField>촬영 장소 수</RequirdField>
          <input
            {...register(`options.${index}.shootingLocationCount`, { required: true, valueAsNumber: true })}
            type="number"
            className="w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
          />
        </div>
        <div>
          <RequirdField>촬영 시간</RequirdField>
          <div className="flex items-center gap-2">
            <input
              {...register(`options.${index}.shootingHours`, { required: true, valueAsNumber: true })}
              type="number"
              className="w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
              placeholder="시간"
            />
            <span>시간</span>
            <input
              {...register(`options.${index}.shootingMinutes`, { required: true, valueAsNumber: true })}
              type="number"
              className="w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
              placeholder="분"
            />
            <span>분</span>
          </div>
        </div>
      </div>

      {/* 원본 / 보정본 */}
      <div className="grid grid-cols-3 items-center gap-4">
        <div className="flex gap-4">
          <RequirdField>원본 제공</RequirdField>
          <div className="flex gap-4">
            <input
              {...register(`options.${index}.originalProvided`, { required: true })}
              value="true"
              type="radio"
              className="w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
            />
            네
            <input
              {...register(`options.${index}.originalProvided`, { required: true })}
              value="false"
              type="radio"
              className="w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
            />
            아니오
          </div>
        </div>
        <div>
          <RequirdField>보정본</RequirdField>
          <div className="flex items-center gap-1">
            <input
              {...register(`options.${index}.retouchedCount`, { required: true, valueAsNumber: true })}
              type="number"
              className="w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
            />
            <span>장</span>
          </div>
        </div>
      </div>

      {/* 의상 수 */}
      <div className="grid grid-cols-3 items-center gap-4">
        <div>
          <RequirdField>의상 수</RequirdField>
          <div className="flex items-center gap-1">
            <input
              {...register(`options.${index}.costumeCount`, { required: true, valueAsNumber: true })}
              type="number"
              className="w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
            />
            <span>벌</span>
          </div>
        </div>
      </div>

      {/* 상세 정보 */}
      <div>
        <label className="mb-1 block font-medium">상품 상세 정보 (기타)</label>
        <textarea
          {...register(`options.${index}.description`)}
          className="w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
        />
      </div>

      {/* 선택 추가사항 */}
      <div>
        <label className="mb-1 block font-medium">선택 추가사항</label>
        <textarea
          {...register(`options.${index}.optionalAdditionalDetails`)}
          className="w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
        />
      </div>
    </div>
  );
};

export default ProductSingleOption;
