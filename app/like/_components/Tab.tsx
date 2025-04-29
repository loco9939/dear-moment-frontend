'use client';

interface TabProps {
  isSelected: string;
  onSelect: (selected: string) => void;
}

export default function Tab({ isSelected, onSelect }: TabProps) {
  return (
    <div className="container h-[3.7rem] top-[11.6rem] flex font-semibold text-body1Normal border-b border-gray-20">
      <div className="w-full h-[3.7rem] text-center cursor-pointer" onClick={() => onSelect('product')}>
        <span className={`${isSelected === 'product' ? 'text-gray-90' : 'text-gray-50'}`}>찜한 상품</span>
        {isSelected == 'product' ? (
          <div className="w-[11rem] h-0 mt-[1.9rem] border-b-2 border-gray-80 rounded-full mx-auto"></div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="w-full h-[3.7rem] text-center cursor-pointer" onClick={() => onSelect('studio')}>
        <span className={`${isSelected === 'studio' ? 'text-gray-90' : 'text-gray-50'}`}>찜한 스튜디오</span>
        {isSelected == 'studio' ? (
          <div className="w-[11rem] h-0 mt-[1.9rem] border-b-2 border-gray-80 rounded-full mx-auto"></div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
