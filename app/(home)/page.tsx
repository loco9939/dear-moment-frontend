import Filtering from "./_components/Filtering";

export default function HomePage() {
  return (
    <div className="container">
      <header>Dear moment</header>
      <main>
        <section>
          <Filtering />
        </section>
        <section>
          <ul>
            <li>
              <div>작가 리스트 1</div>
            </li>
            <li>
              <div>작가 리스트 2</div>
            </li>
            <li>
              <div>작가 리스트 3</div>
            </li>
          </ul>
        </section>
        <section>
          <div>네비게이션</div>
        </section>
      </main>
    </div>
  );
}
