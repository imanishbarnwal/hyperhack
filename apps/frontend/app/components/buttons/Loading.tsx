import React, { forwardRef, ButtonHTMLAttributes, useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

const LoadingButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { loading } = props

    const [buttonWidth, setButtonWidth] = useState<number | null>(null);

    useEffect(() => {
        if (ref && 'current' in ref && ref.current) {
            setButtonWidth(ref.current.offsetWidth);
        }
    }, [ref]);

  return (
    <button 
      {...props}
      ref={ref}
      style={{
        width: loading && buttonWidth ? `${buttonWidth}px` : 'auto',
        ...props.style,
      }}
    >
      {loading ? <AiOutlineLoading3Quarters size={18} className='animate-spin' /> : props.children}
    </button>
  );
});

LoadingButton.displayName = 'LoadingButton';

export default LoadingButton;
