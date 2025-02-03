import { useState } from "react";
import { FilterType, FilterValue } from "../type";

export function useFilteringController() {
  const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>("정렬");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<FilterType, FilterValue>
  >({
    정렬: "",
    촬영시기: "",
    스타일: [],
    패키지: "",
    가격: 0,
  });

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
