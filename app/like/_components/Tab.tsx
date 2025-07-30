'use client';

interface TabProps {
  isSelected: string;
  onSelect: (selected: string) => void;
}

export default function Tab({ isSelected, onSelect }: TabProps) {
  return (
    <div className="container top-[11.6rem] flex h-[3.7rem] border-b border-gray-20 text-body1Normal font-semibold">
      <div className="h-[3.7rem] w-full cursor-pointer text-center" onClick={() => onSelect('studio')}>
        <span className={`${isSelected === 'studio' ? 'text-gray-90' : 'text-gray-50'}`}>찜한 스튜디오</span>
        {isSelected == 'studio' ? (
          <div className="mx-auto mt-[1.9rem] h-0 w-[11rem] rounded-full border-b-2 border-gray-80"></div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="h-[3.7rem] w-full cursor-pointer text-center" onClick={() => onSelect('product')}>
        <span className={`${isSelected === 'product' ? 'text-gray-90' : 'text-gray-50'}`}>찜한 상품</span>
        {isSelected == 'product' ? (
          <div className="mx-auto mt-[1.9rem] h-0 w-[11rem] rounded-full border-b-2 border-gray-80"></div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
