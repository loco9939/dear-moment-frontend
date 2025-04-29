import { Icon_Kakao } from '@/assets/icons';

export const KakaoLogin = () => {
  const goLogin = () => {
    const KAKAO_CLIENT_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
    const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_URI;

    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoUrl;
  };
  return (
    <button
      className="flex h-[5.6rem] w-full items-center justify-center gap-[1rem] rounded-[1.2rem] bg-[#FEE500] text-body1Normal font-medium text-gray-90"
      onClick={goLogin}
    >
      <Icon_Kakao />
      카카오로 계속하기
    </button>
  );
};
