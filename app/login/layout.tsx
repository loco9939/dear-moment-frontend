export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container min-h-screen">
      <div>{children}</div>
    </div>
  );
}
