import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { FilterType, FilterValue } from '../type';

interface UseScrollProps {
  scrollContainerRef: React.RefObject<HTMLUListElement>;
  filterOptions?: Record<FilterType, FilterValue>;
}

export const useScroll = ({ scrollContainerRef, filterOptions }: UseScrollProps) => {
  // 스크롤 위치 복원을 위한 키 (로컬 스토리지 키)
  const SCROLL_POSITION_KEY = 'productListScrollPosition';
  // 스크롤 위치 저장을 위한 디바운스 타이머
  const scrollDebounceTimer = useRef<NodeJS.Timeout>();
  // 필터가 변경되면 스크롤 위치 초기화
  const prevFilterOptions = useRef(filterOptions);
  // 초기 로딩 상태를 추적하기 위한 ref
  const isInitialMount = useRef(true);

  // 스크롤 위치 저장 함수 (디바운싱 적용)
  const saveScrollPosition = useCallback(() => {
    if (!scrollContainerRef.current) return;

    // 이전 타이머가 있으면 취소
    if (scrollDebounceTimer.current) {
      clearTimeout(scrollDebounceTimer.current);
    }

    // 디바운싱 적용 (100ms)
    scrollDebounceTimer.current = setTimeout(() => {
      if (!scrollContainerRef.current) return;

      const scrollPosition = scrollContainerRef.current.scrollTop;
      // 스크롤 위치가 0이 아닌 경우에만 저장
      if (scrollPosition > 0) {
        console.log('Saving scroll position:', scrollPosition);
        localStorage.setItem(SCROLL_POSITION_KEY, scrollPosition.toString());
      }
    }, 100);
  }, []);

  // 스크롤 위치 복원 함수
  const restoreScrollPosition = useCallback(() => {
    if (!scrollContainerRef.current) return false;

    const savedPosition = localStorage.getItem(SCROLL_POSITION_KEY);
    console.log('Restoring scroll position:', savedPosition);

    if (savedPosition) {
      const scrollPosition = parseInt(savedPosition, 10);
      if (!isNaN(scrollPosition)) {
        console.log('Setting scroll position to:', scrollPosition);
        scrollContainerRef.current.scrollTop = scrollPosition;
        return true;
      }
    }
    return false;
  }, []);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;
      console.log('Current scroll position:', scrollTop);
      saveScrollPosition();
    }
  }, [saveScrollPosition]);

  // 필터가 실제로 변경되었는지 확인하는 함수
  const hasFilterChanged = useCallback((prevFilters: any, currentFilters: any) => {
    if (!prevFilters || !currentFilters) return false;
    return JSON.stringify(prevFilters) !== JSON.stringify(currentFilters);
  }, []);

  // 스크롤 이벤트 리스너 등록 및 해제
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  useLayoutEffect(() => {
    // 초기 마운트 시에만 스크롤 위치 복원 시도
    if (isInitialMount.current) {
      console.log('Initial mount, attempting to restore scroll position...');
      const timer = setTimeout(() => {
        const restored = restoreScrollPosition();
        if (restored) {
          console.log('Scroll position restored from initial mount');
        } else {
          console.log('No saved scroll position found');
        }
      }, 300); // 더 긴 지연 시간으로 변경

      isInitialMount.current = false;
      return () => clearTimeout(timer);
    }

    // 필터가 실제로 변경된 경우에만 스크롤 위치 초기화
    if (hasFilterChanged(prevFilterOptions.current, filterOptions)) {
      console.log('Filter actually changed, resetting scroll position');
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
        localStorage.removeItem(SCROLL_POSITION_KEY);
      }
    }
    prevFilterOptions.current = filterOptions;
  }, [filterOptions, hasFilterChanged]);

  // 페이지 진입 시 스크롤 위치 복원을 위한 효과
  useEffect(() => {
    // 페이지가 완전히 로드된 후 스크롤 위치 복원 시도
    const handlePageLoad = () => {
      if (!scrollContainerRef.current) return;

      const savedPosition = localStorage.getItem(SCROLL_POSITION_KEY);
      if (!savedPosition) return;

      const scrollPosition = parseInt(savedPosition, 10);
      if (isNaN(scrollPosition)) return;

      console.log('Page loaded, restoring scroll position:', scrollPosition);

      // 짧은 지연 후 스크롤 복원 시도 (DOM이 완전히 준비될 시간을 줌)
      const restoreTimer = setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollPosition;
          console.log('Scroll position restored to:', scrollPosition);
          // 복원 후 스크롤 위치 제거 (한 번만 복원하기 위함)
          localStorage.removeItem(SCROLL_POSITION_KEY);
        }
      }, 100);

      return () => clearTimeout(restoreTimer);
    };

    // 페이지 로드 완료 이벤트 리스너 등록
    if (document.readyState === 'complete') {
      const timer = setTimeout(handlePageLoad, 0);
      return () => clearTimeout(timer);
    } else {
      window.addEventListener('load', handlePageLoad);
      return () => window.removeEventListener('load', handlePageLoad);
    }
  }, []);
};
