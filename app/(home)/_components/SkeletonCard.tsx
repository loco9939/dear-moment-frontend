import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonCard() {
  const mockData = [1, 2, 3];
  return (
    <>
      {mockData.map(item => {
        return (
          <div key={item} className="w-full cursor-pointer rounded-lg bg-white p-2">
            {/* 이미지 영역 */}
            <div className="relative h-[13.6rem] w-full overflow-hidden rounded-lg">
              <div className="flex h-full gap-2">
                {[1, 2, 3].map(item => (
                  <div key={item} className="h-full w-1/3 flex-shrink-0">
                    <Skeleton className="h-full w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* 텍스트 정보 영역 */}
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>

              <div className="space-y-1">
                <Skeleton className="h-5 w-1/5" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
