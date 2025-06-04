import clsx from 'clsx';
import { ReactNode } from 'react';

interface RequirdFieldProps {
  className?: string;
  children?: ReactNode;
}

const RequirdField = ({ className, children }: RequirdFieldProps) => {
  return (
    <label className={clsx('mb-1 inline-block rounded-md bg-yellow-300 p-1 font-medium', className)}>
      {children} <span className="text-[#FF0000]">*</span>
    </label>
  );
};

export default RequirdField;
