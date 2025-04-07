import {
  CAMERA_DISPLAY_MAP,
  CAMERA_OPTIONS,
  INITIAL_FILTER_STATE,
  PACKAGE_DISPLAY_MAP,
  PACKAGE_OPTIONS,
  PRICE_RANGE_MAP,
  SHOOTING_PERIOD_DISPLAY_MAP,
  SHOOTING_PERIOD_OPTIONS,
  SORT_DISPLAY_MAP,
  SORT_OPTIONS,
  STYLE_DISPLAY_MAP,
  STYLE_OPTIONS,
} from '../models/FilteringModel';
import { CameraType, FilterType, FilterValue, PackageType, PriceRange, RetouchStyle, ShootingPeriod, SortOption } from '../type';

// 실제 서비스에서는 API 호출로 대체될 부분
export class FilteringService {
  static getInitialFilterState(): Record<FilterType, FilterValue> {
    return INITIAL_FILTER_STATE;
  }

  static getSortOptions(): readonly SortOption[] {
    return SORT_OPTIONS;
  }

  static getSortDisplayMap(): Record<SortOption, string> {
    return SORT_DISPLAY_MAP;
  }

  static getCameraOptions(): readonly CameraType[] {
    return CAMERA_OPTIONS;
  }

  static getCameraDisplayMap(): Record<CameraType, string> {
    return CAMERA_DISPLAY_MAP;
  }

  static getShootingPeriodOptions(): readonly ShootingPeriod[] {
    return SHOOTING_PERIOD_OPTIONS;
  }

  static getShootingPeriodDisplayMap(): Record<ShootingPeriod, string> {
    return SHOOTING_PERIOD_DISPLAY_MAP;
  }

  static getStyleOptions(): readonly RetouchStyle[] {
    return STYLE_OPTIONS;
  }

  static getStyleDisplayMap(): Record<RetouchStyle, string> {
    return STYLE_DISPLAY_MAP;
  }

  static getPackageOptions(): readonly PackageType[] {
    return PACKAGE_OPTIONS;
  }

  static getPackageDisplayMap(): Record<PackageType, string> {
    return PACKAGE_DISPLAY_MAP;
  }

  static getPriceRangeOptions(): string[] {
    return Object.keys(PRICE_RANGE_MAP);
  }

  static getPriceRangeFromValue(value: string): PriceRange {
    return PRICE_RANGE_MAP[value] || { min: undefined, max: undefined };
  }

  static getPriceRangeMap() {
    return PRICE_RANGE_MAP;
  }
}
