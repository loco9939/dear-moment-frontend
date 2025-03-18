import { Icon_ChevronDown } from '@/assets/icons';
import { Appbar } from '@/components/Appbar';
import Link from 'next/link';

const AuthorsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      <Appbar
        leftIcon={
          <Link href="/">
            <Icon_ChevronDown className="rotate-90 cursor-pointer" />
          </Link>
        }
        className="absolute z-10"
      />
      {children}
    </div>
  );
};

export default AuthorsLayout;
