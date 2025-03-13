"use client";

import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { useFilteringController } from "../controllers/FilteringController";
import FilteringModal from "./FilteringModal";

export default function Filtering() {
  const {
    open,
    filterType,
    selectedFilters,
    handleFilterClick,
    setOpen,
    setSelectedFilters,
  } = useFilteringController();

  return (
    <>
      <div className="flex gap-2">
        <Button
          className="bg-gray-500"
          onClick={() => handleFilterClick("정렬")}
        >
          정렬
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
        <Button
          className="bg-gray-500"
          onClick={() => handleFilterClick("촬영시기")}
        >
          촬영시기
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
        <Button
          className="bg-gray-500"
          onClick={() => handleFilterClick("스타일")}
        >
          스타일
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
        <Button
          className="bg-gray-500"
          onClick={() => handleFilterClick("패키지")}
        >
          패키지
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
        <Button
          className="bg-gray-500"
          onClick={() => handleFilterClick("가격")}
        >
          가격
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
      </div>
      <FilteringModal
        open={open}
        onOpenChange={setOpen}
        filterType={filterType}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    </>
  );
}
