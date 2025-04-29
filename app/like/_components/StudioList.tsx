import { MainLikeStudio } from '@/api/likes/types';
import StudioCard from './StudioCard';
import LoadingSpinner from '@/components/LoadingSpinner';
interface StudioListProps {
  likeStudios: MainLikeStudio[];
  loading: boolean;
  error: string | null;
}

export default function StudioList({ likeStudios = [], loading, error }: StudioListProps) {
  return (
    <div>
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      )}
      {likeStudios?.length === 0 && !loading && !error && (
        <div className="text-body1Normal font-semibold text-center text-gray-90 py-4 rounded relative">
          찜한 스튜디오가 없습니다.
        </div>
      )}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>}

      {!loading &&
        likeStudios.map((studio: MainLikeStudio) => (
          <div key={studio.likeId} className="mb-4">
            <StudioCard likeStudios={studio} />
          </div>
        ))}
    </div>
  );
}
