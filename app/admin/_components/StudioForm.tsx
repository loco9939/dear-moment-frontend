'use client';

import Plus from '../../assets/icons/svg/plus_circle.svg';
import Minus from '../../assets/icons/svg/minus_circle.svg';
import { FormProvider } from 'react-hook-form';
import { useStudio } from '../_hooks/studio/useStudio';
import { PARTNERSHOPS_CATEGORY } from '../_constants/studio';

interface StudioFormProps {
  studioId: string | null;
}

const StudioForm = ({ studioId }: StudioFormProps) => {
  const studioMethods = useStudio(studioId);
  const {
    register,
    handleSubmit,
    onSubmit,
    reset,
    formState: { errors },
    fields,
    append,
    remove,
  } = studioMethods;

  return (
    <FormProvider {...studioMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6 p-6 text-[1.2rem]">
        {/* 상태 */}
        <div>
          <label className="mb-1 block font-medium">
            상태 <span className="text-[#FF0000]">*</span>
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <input type="radio" value="ACTIVE" {...register('status', { required: true })} />
              <span>활성</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" value="INACTIVE" {...register('status', { required: true })} />
              <span>비활성</span>
            </label>
          </div>
          {errors.status && <p className="text-red-500">필수 선택</p>}
        </div>

        {/* 영업 스튜디오 */}
        <div>
          <label className="mb-1 block font-medium">
            영업 스튜디오 <span className="text-[#FF0000]">*</span>
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="true"
                {...register('isCasted', { required: true, setValueAs: v => (v === 'true' ? true : false) })}
              />
              <span>해당</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="false"
                {...register('isCasted', { required: true, setValueAs: v => (v === 'true' ? true : false) })}
              />
              <span>비해당</span>
            </label>
          </div>
          {errors.isCasted && <p className="text-red-500">필수 선택</p>}
        </div>

        {/* 스튜디오명 & 연락처 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block font-medium">
              스튜디오명 <span className="text-[#FF0000]">*</span>
            </label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
            />
            {errors.name && <p className="text-red-500">필수 작성</p>}
          </div>
          <div>
            <label className="mb-1 block font-medium">
              연락처 <span className="text-[#FF0000]">*</span>
            </label>
            <input
              type="text"
              placeholder="'010-0000-0000' 형태로 작성 해주세요."
              {...register('contact', { required: true })}
              className="w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
            />
            {errors.contact && <p className="text-red-500">필수 작성</p>}
          </div>
        </div>

        {/* 소개글 */}
        <div>
          <label className="mb-1 block font-medium">
            스튜디오 소개글 <span className="text-[#FF0000]">*</span>
          </label>
          <textarea
            {...register('studioIntro', { required: true, maxLength: 100 })}
            className="h-28 w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
          />
          {errors.studioIntro && <p className="text-red-500">필수 작성</p>}
        </div>
        <div>
          <label className="mb-1 block font-medium">
            소속 작가 소개글 <span className="text-[#FF0000]">*</span>
          </label>
          <textarea
            {...register('artistsIntro', { required: true })}
            className="h-28 w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
          />
          {errors.artistsIntro && <p className="text-red-500">필수 작성</p>}
        </div>

        {/* 링크 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block font-medium">
              인스타그램 링크 <span className="text-[#FF0000]">*</span>
            </label>
            <input
              type="text"
              {...register('instagramUrl', { required: true })}
              className="w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
            />
            {errors.instagramUrl && <p className="text-red-500">필수 작성</p>}
          </div>
          <div>
            <label className="mb-1 block font-medium">
              카카오톡 채널 링크 <span className="text-[#FF0000]">*</span>
            </label>
            <input
              type="text"
              {...register('kakaoChannelUrl', { required: true })}
              className="w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
            />
            {errors.kakaoChannelUrl && <p className="text-red-500">필수 작성</p>}
          </div>
        </div>

        {/* 제휴 업체 플러스 버튼 클릭 시 배열 추가 시켜야함. */}
        <div>
          <label className="mb-2 block font-medium">일반 제휴 업체</label>

          {fields.map((field, index) => (
            <div key={field.id} className="mb-2 grid grid-cols-4 items-center gap-2">
              {/* 카테고리 select */}
              <select
                {...register(`partnerShops.${index}.category`, { required: true })}
                className="w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
                defaultValue={field.category ?? ''}
              >
                <option value="" disabled>
                  제휴 업체 구분
                </option>
                {Object.entries(PARTNERSHOPS_CATEGORY).map(([label, value]) => (
                  <option value={value} key={value}>
                    {label}
                  </option>
                ))}
              </select>

              {/* 제휴 업체명 input */}
              <input
                {...register(`partnerShops.${index}.name`, { required: true })}
                type="text"
                placeholder="제휴 업체명"
                defaultValue={field.name}
                className="w-full rounded-md border border-solid border-[#D8DDE3] p-2"
              />

              {/* 링크 input */}
              <input
                {...register(`partnerShops.${index}.urlLink`, { required: true })}
                type="text"
                placeholder="링크"
                defaultValue={field.urlLink}
                className="w-full rounded-md border border-solid border-[#D8DDE3] p-2"
              />

              {/* 버튼 영역 */}
              <div className="flex w-full gap-2">
                {/* 추가 */}
                <button
                  type="button"
                  onClick={() => append({ category: 'WEDDING_SHOP', name: '', urlLink: '' })}
                  className="flex items-center justify-center"
                >
                  <Plus width={16.5} height={16.5} />
                </button>

                {/* 삭제 */}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  className="flex items-center justify-center"
                >
                  <Minus width={16.5} height={16.5} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 예약 전 안내사항 */}
        <div>
          <label className="mb-1 block font-medium">예약 전 안내사항</label>
          <textarea
            {...register('reservationNotice')}
            className="h-28 w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
          />
        </div>

        {/* 취소 및 환불규정 */}
        <div>
          <label className="mb-1 block font-medium">취소 및 환불규정</label>
          <textarea
            {...register('cancellationPolicy')}
            className="h-28 w-full rounded-md border border-solid border-[#D8DDE3] p-2 focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
          />
        </div>

        {/* 버튼 */}
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={() => reset()} type="button" className="rounded bg-[#E0E0E0] px-4 py-2 text-black">
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

export default StudioForm;
