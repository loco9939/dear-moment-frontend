import AuthorCard from './AuthorCard';

export default function AuthorList() {
  return (
    <section className="px-[2rem]">
      <p className="text-body1Normal font-bold text-gray-90 mt-[2.4rem] mb-[1rem]">지금 가장 HOT한 스냅 작가!</p>
      <ul className="space-y-[1.7rem]">
        <li>
          <AuthorCard isFirst />
        </li>
        <li>
          <AuthorCard />
        </li>
        <li>
          <AuthorCard />
        </li>
      </ul>
    </section>
  );
}
