import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold focus-visible:outline-none disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default_fill_primary: 'bg-common-100 text-gray-10 hover:bg-gray-90 disabled:bg-gray-80 disabled:text-gray-50',
        inverse_fill_secondary: 'bg-gray-20 text-common-100 hover:bg-gray-10 disabled:bg-gray-10 disabled:text-gray-40',
        default_fill_secondary: 'bg-gray-80 text-gray-10 hover:bg-gray-70 disabled:bg-gray-40 disabled:text-gray-50',
        inverse_fill_primary: 'bg-gray-90 text-gray-10 hover:bg-gray-80 disabled:bg-gray-60 disabled:text-gray-50',
        inverse_outlined:
          'border border-solid border-gray-30 text-common-100 hover:border-gray-20 disabled:border-gray-20 disabled:text-gray-40',
        default_outlined:
          'border border-solid border-gray-70 text-gray-10 hover:border-gray-60 disabled:border-gray-80 disabled:text-gray-50',
      },
      size: {
        sm: 'p-3 rounded-[0.2rem]',
        md: 'p-4 rounded-[0.2rem]',
        lg: 'p-5 rounded-[0.4rem]',
      },
      hasIcon: {
        true: 'gap-2',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default_fill_primary',
      size: 'lg',
      hasIcon: false,
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, hasIcon, isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, hasIcon, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
