'use client';

import { useSearchParams } from 'next/navigation';

export default function OnboardingStep2Info() {
  const params = useSearchParams();
  const nickname = params.get('nickname');

  return (
    <div>
      <div className="text-body2Reading font-medium text-gray-90 mb-[0.8rem]">
        <span>STEP 2/</span>
        <span className="text-gray-40">2</span>
      </div>
      <p className="text-title2 font-semibold text-gray-90">{nickname}님의</p>
      <p className="text-title2 font-semibold text-gray-90">기본 정보를 알려주세요.</p>
    </div>
  );
}
