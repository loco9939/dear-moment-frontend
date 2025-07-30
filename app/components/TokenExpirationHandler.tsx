'use client';

import { useEffect } from 'react';
import { initializeTokenExpirationCheck } from '@/utils/auth';

/**
 * 토큰 만료 감지를 처리하는 컴포넌트
 * 앱 시작 시 토큰 만료 감지 기능을 초기화합니다.
 */
export default function TokenExpirationHandler() {
  useEffect(() => {
    // 앱 시작 시 토큰 만료 감지 초기화
    initializeTokenExpirationCheck();
  }, []);

  // 이 컴포넌트는 UI를 렌더링하지 않습니다
  return null;
} 