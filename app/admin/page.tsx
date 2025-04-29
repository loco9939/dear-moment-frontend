import Header from './_components/Header';
import LoginForm from './_components/LoginForm';

const AdminPage = () => {
  return (
    <section className="flex h-full flex-col items-center justify-center gap-[4rem] text-[1.6rem]">
      <Header className={'text-title2 font-semibold tracking-normal'}>백오피스 로그인</Header>
      <LoginForm />
    </section>
  );
};

export default AdminPage;
