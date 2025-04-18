'use client';

export default function DesignSystemPage() {
  return (
    // 전체 페이지 컨테이너
    <div className="container min-h-[100dvh] bg-background">
      {/* 헤더 영역 */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center">
          <h1 className="text-lg font-semibold">디자인 시스템 테스트</h1>
        </div>
        <p>Test Build2</p>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="py-6">
        {/* 타이포그래피 섹션 */}
        <section className="mb-8 p-1">
          <h2 className="text-2xl font-bold mb-4 p-1">타이포그래피</h2>
          <div className="space-y-4">
            <p className="text-4xl font-bold">Heading 1</p>
            <p className="text-3xl font-bold">Heading 2 </p>
            <p className="text-2xl font-bold">Heading 3 </p>
            <p className="text-xl font-semibold">Heading 4 </p>
            <p className="text-base">기본 텍스트 </p>
            <p className="text-sm">작은 텍스트 </p>
            <p className="text-xs">아주 작은 텍스트 </p>
          </div>
        </section>

        {/* 간격 데모 섹션 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">간격 시스템</h2>
          <div>
            <div className="bg-primary/10 p-base">padding (1.2rem )</div>
            <div className="mt-lg bg-secondary/10">margin (1.6rem )</div>
          </div>
        </section>

        {/* 반응형 그리드 데모 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">반응형 그리드</h2>
          <div className="grid gricols-1 md:gricols-2 lg:gricols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(item => (
              <div key={item} className="p-4 roundelg border bg-card text-carforeground shadow">
                <p className="text-base font-medium">카드 {item}</p>
                <p className="text-base text-muteforeground">반응형 그리드 시스템 데모</p>
              </div>
            ))}
          </div>
        </section>

        {/* 폰트 무게 데모 */}
        <section className="mt-">
          <h2 className="text-2xl font-bold mb-4">폰트 무게</h2>
          <div className="space-y-2">
            <p className="text-base font-thin">Thin (100) 텍스트</p>
            <p className="text-base font-light">Light (300) 텍스트</p>
            <p className="text-base font-normal">Normal (400) 텍스트</p>
            <p className="text-base font-medium">Medium (500) 텍스트</p>
            <p className="text-base font-semibold">Semibold (600) 텍스트</p>
            <p className="text-base font-bold">Bold (700) 텍스트</p>
            <p className="text-base font-extrabold">Extrabold (800) 텍스트</p>
          </div>
        </section>
      </main>
    </div>
  );
}
