import {
  CAMERA_DISPLAY_MAP,
  CAMERA_OPTIONS,
  INITIAL_FILTER_STATE,
  PACKAGE_DISPLAY_MAP,
  PACKAGE_OPTIONS,
  SHOOTING_PERIOD_DISPLAY_MAP,
  SHOOTING_PERIOD_OPTIONS,
  SORT_DISPLAY_MAP,
  SORT_OPTIONS,
  STYLE_DISPLAY_MAP,
  STYLE_OPTIONS
} from '../models/FilteringModel';
import { CameraType, FilterType, FilterValue, PackageType, RetouchStyle, ShootingPeriod, SortOption } from '../type';

// 실제 서비스에서는 API 호출로 대체될 부분
export class FilteringService {
  /**
   * 초기 필터 상태 반환
   * @returns 초기 필터 상태
   */
  static getInitialFilterState(): Record<FilterType, FilterValue> {
    return INITIAL_FILTER_STATE;
  }

  /**
   * 정렬 옵션 반환
   * @returns 정렬 옵션 배열
   */
  static getSortOptions(): readonly SortOption[] {
    return SORT_OPTIONS;
  }

  /**
   * 정렬 옵션 표시 매핑 반환
   * @returns 정렬 옵션 표시 매핑
   */
  static getSortDisplayMap(): Record<SortOption, string> {
    return SORT_DISPLAY_MAP;
  }

  /**
   * 카메라 종류 옵션 반환
   * @returns 카메라 종류 옵션 배열
   */
  static getCameraOptions(): readonly CameraType[] {
    return CAMERA_OPTIONS;
  }

  /**
   * 카메라 종류 옵션 표시 매핑 반환
   * @returns 카메라 종류 옵션 표시 매핑
   */
  static getCameraDisplayMap(): Record<CameraType, string> {
    return CAMERA_DISPLAY_MAP;
  }

  /**
   * 촬영 시기 옵션 반환
   * @returns 촬영 시기 옵션 배열
   */
  static getShootingPeriodOptions(): readonly ShootingPeriod[] {
    return SHOOTING_PERIOD_OPTIONS;
  }

  /**
   * 촬영 시기 옵션 표시 매핑 반환
   * @returns 촬영 시기 옵션 표시 매핑
   */
  static getShootingPeriodDisplayMap(): Record<ShootingPeriod, string> {
    return SHOOTING_PERIOD_DISPLAY_MAP;
  }

  /**
   * 보정 스타일 옵션 반환
   * @returns 보정 스타일 옵션 배열
   */
  static getStyleOptions(): readonly RetouchStyle[] {
    return STYLE_OPTIONS;
  }

  /**
   * 보정 스타일 옵션 표시 매핑 반환
   * @returns 보정 스타일 옵션 표시 매핑
   */
  static getStyleDisplayMap(): Record<RetouchStyle, string> {
    return STYLE_DISPLAY_MAP;
  }

  /**
   * 패키지 옵션 반환
   * @returns 패키지 옵션 배열
   */
  static getPackageOptions(): readonly PackageType[] {
    return PACKAGE_OPTIONS;
  }

  /**
   * 패키지 옵션 표시 매핑 반환
   * @returns 패키지 옵션 표시 매핑
   */
  static getPackageDisplayMap(): Record<PackageType, string> {
    return PACKAGE_DISPLAY_MAP;
  }
}
