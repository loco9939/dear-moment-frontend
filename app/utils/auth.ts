import { getStorage, setStorage } from './localStorage';
import { toast } from 'sonner';

// 토큰 만료 처리 중복 실행 방지 플래그
let isHandlingTokenExpiration = false;

/**
 * 쿠키에서 토큰 가져오기
 */
export const getCookieToken = (): string | null => {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  const accessTokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));

  return accessTokenCookie ? accessTokenCookie.split('=')[1] : null;
};

/**
 * 토큰 만료 시간 확인
 */
export const isTokenExpired = (): boolean => {
  if (typeof window === 'undefined') return true;

  const expirationTime = localStorage.getItem('tokenExpiration');
  if (!expirationTime) return true;

  const now = Date.now();
  const expiration = parseInt(expirationTime, 10);

  return now >= expiration;
};

/**
 * 쿠키 만료 감지 및 localStorage 동기화
 */
export const checkTokenExpiration = (): void => {
  if (typeof window === 'undefined') return;

  // 이미 리다이렉트 중인지 확인하는 플래그
  if (window.location.pathname === '/login') return;

  // 중복 실행 방지
  if (isHandlingTokenExpiration) return;

  const cookieToken = getCookieToken();
  const localStorageToken = getStorage('accessToken');
  const isExpired = isTokenExpired();

  // 로그인하지 않은 사용자는 토큰 체크를 하지 않음
  if (!cookieToken && !localStorageToken) return;

  // 쿠키에 토큰이 없거나, localStorage에 토큰이 없거나, 만료 시간이 지났으면 초기화
  if ((!cookieToken && localStorageToken) || isExpired) {
    isHandlingTokenExpiration = true;

    console.log('토큰이 만료되어 localStorage를 초기화합니다.');
    clearUserData();

    toast('로그인 시간이 만료되었습니다. 다시 로그인해주세요.', {
      duration: 3000,
      position: 'bottom-center',
      icon: '🔐',
      style: {
        background: '#fef2f2',
        color: '#dc2626',
        border: '1px solid #fecaca',
      },
    });

    // console.log로 개발자에게 알림
    console.warn('로그인 유효시간이 만료되어 로그인 페이지로 이동합니다.');

    // 토스트 메시지가 표시된 후 로그인 페이지로 리다이렉트
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000); // 2초 후 리다이렉트하여 사용자가 메시지를 읽을 수 있도록 함
  }
};

/**
 * 토큰 만료 시 사용자 정보 초기화 함수
 * 403 에러나 토큰 만료 시 호출
 */
export const clearUserData = (): void => {
  // localStorage 정리
  localStorage.removeItem('accessToken');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('tokenExpiration');

  // 쿠키 정리
  if (typeof document !== 'undefined') {
    document.cookie = 'accessToken=; path=/; max-age=0; secure; samesite=strict';
  }

  // 세션 스토리지 정리
  sessionStorage.clear();

  console.log('사용자 데이터가 초기화되었습니다. 다시 로그인해주세요.');
};

/**
 * 토큰 저장 함수 (로그인 시 사용)
 * localStorage와 쿠키에 동시 저장
 */
export const saveToken = (token: string): void => {
  // 24시간 후 만료 시간 계산
  const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24시간

  // localStorage에 저장
  setStorage('accessToken', token);
  setStorage('isLoggedIn', 'true');
  setStorage('tokenExpiration', expirationTime.toString());

  // 쿠키에 저장 (24시간)
  document.cookie = `accessToken=${token}; path=/; max-age=86400; secure; samesite=strict`;

  // 토큰 만료 감지 타이머 설정 (24시간 후)
  setTimeout(
    () => {
      checkTokenExpiration();
    },
    24 * 60 * 60 * 1000
  ); // 24시간을 밀리초로 변환
};

/**
 * 앱 시작 시 토큰 만료 감지 초기화
 */
export const initializeTokenExpirationCheck = (): void => {
  if (typeof window === 'undefined') return;

  // 페이지 로드 시 즉시 체크
  checkTokenExpiration();

  // 주기적으로 체크 (5분마다)
  setInterval(checkTokenExpiration, 5 * 60 * 1000);

  // 페이지 포커스 시 체크
  window.addEventListener('focus', checkTokenExpiration);

  // 페이지 가시성 변경 시 체크
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      checkTokenExpiration();
    }
  });
};
