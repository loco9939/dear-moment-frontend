import AuthorCard from "./AuthorCard";

export default function AuthorList() {
  return (
    <ul className="space-y-4">
      <li>
        <AuthorCard />
      </li>
      <li>
        <AuthorCard />
      </li>
      <li>
        <AuthorCard />
      </li>
    </ul>
  );
}
