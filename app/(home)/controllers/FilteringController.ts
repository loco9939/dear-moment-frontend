import { useState } from "react";
import { FilteringService } from "../services/FilteringService";
import { FilterType, FilterValue } from "../type";

export function useFilteringController() {
  const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>("정렬");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<FilterType, FilterValue>
  >(FilteringService.getInitialFilterState());

  const handleFilterClick = (type: FilterType) => {
    setFilterType(type);
    setOpen(true);
  };

  return {
    open,
    filterType,
    selectedFilters,
    handleFilterClick,
    setOpen,
    setSelectedFilters,
  };
}
