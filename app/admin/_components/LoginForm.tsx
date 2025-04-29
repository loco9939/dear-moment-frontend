'use client';

import { useLogin } from '../_hooks/login/useLogin';

const LoginForm = () => {
  const methods = useLogin();
  const { register, handleSubmit, onSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-[1rem]">
      <input
        {...register('loginId', { required: true })}
        placeholder="아이디"
        className="h-[4rem] w-[40.3rem] rounded-md border border-solid border-[#D8DDE3] px-[1.8rem] py-[0.9rem] focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
      />
      <input
        {...register('password', { required: true })}
        type="password"
        placeholder="비밀번호"
        className="h-[4rem] w-[40.3rem] rounded-md border border-solid border-[#D8DDE3] px-[1.8rem] py-[0.9rem] focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
      />
      <button type="submit" className="mt-[0.9rem] h-[5.6rem] w-[40.3rem] rounded-md bg-[#3F3F3F] text-white">
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
