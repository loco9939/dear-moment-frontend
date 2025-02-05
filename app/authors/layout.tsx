const AuthorsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">작가 목록</h1>
      {children}
    </div>
  );
};

export default AuthorsLayout;
