import React from 'react';
import { AdminLayoutProps } from './_types/common';


const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <main className="w-screen h-screen flex flex-col items-center overflow-x-hidden">{children}</main>;
};

export default AdminLayout;
