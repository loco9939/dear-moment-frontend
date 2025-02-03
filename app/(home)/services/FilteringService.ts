import {
  FilteringUtils,
  INITIAL_FILTER_STATE,
  PACKAGE_OPTIONS,
  PRICE_RANGE_MAP,
  SHOOTING_PERIOD_OPTIONS,
  SORT_OPTIONS,
  STYLE_OPTIONS,
} from "../models/FilteringModel";
import { FilterType, FilterValue } from "../type";

// 실제 서비스에서는 API 호출로 대체될 부분
export class FilteringService {
  static getInitialFilterState(): Record<FilterType, FilterValue> {
    return INITIAL_FILTER_STATE;
  }

  static getSortOptions(): readonly string[] {
    return SORT_OPTIONS;
  }

  static getShootingPeriodOptions(): readonly string[] {
    return SHOOTING_PERIOD_OPTIONS;
  }

  static getStyleOptions(): readonly string[] {
    return STYLE_OPTIONS;
  }

  static getPackageOptions(): readonly string[] {
    return PACKAGE_OPTIONS;
  }

  static getPriceRangeOptions(): string[] {
    return Object.keys(PRICE_RANGE_MAP);
  }

  static getCurrentPriceButton(price: number): string {
    return FilteringUtils.getCurrentPriceButton(price);
  }

  static getPriceRange(value: string) {
    return FilteringUtils.getPriceRange(value);
  }
}
