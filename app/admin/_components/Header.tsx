import clsx from 'clsx';

interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

const Header = ({ className, children }: HeaderProps) => {
  return <header className={clsx('z-10 cursor-default', className)}>{children}</header>;
};

export default Header;
