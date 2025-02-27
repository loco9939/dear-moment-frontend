import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva('inline-flex items-center justify-center font-semibold focus-visible:outline-none', {
  variants: {
    variant: {
      black: 'bg-common-100 text-gray-10 hover:bg-gray-90 disabled:bg-gray-80 disabled:text-gray-50',
      gray20: 'bg-gray-20 text-common-100 hover:bg-gray-10 disabled:bg-gray-10 disabled:text-gray-40',
      gray80: 'bg-gray-80 text-gray-10 hover:bg-gray-70 disabled:bg-gray-40 disabled:text-gray-50',
      gray90: 'bg-gray-90 text-gray-10 hover:bg-gray-80 disabled:bg-gray-60 disabled:text-gray-50',
      outline30:
        'border border-solid border-gray-30 text-common-100 hover:border-gray-20 disabled:border-gray-20 disabled:text-gray-40',
      outline70:
        'border border-solid border-gray-70 text-gray-10 hover:border-gray-60 disabled:border-gray-80 disabled:text-gray-50',
    },
    size: {
      sm: 'p-3 rounded-xs',
      md: 'p-4 rounded-xs',
      lg: 'p-5 rounded-sm',
    },
    hasIcon: {
      true: 'gap-2',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'black',
    size: 'lg',
    hasIcon: false,
  },
});

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
