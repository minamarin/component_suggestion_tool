import { Button } from '@visa/nova-react';
import type { ReactNode } from 'react';

interface DefaultButtonProps {
  children: ReactNode;
  onClick?: () => void | Promise<void>;
  style?: React.CSSProperties;
  type?: string;
  appearance?: string;
  theme?: string;
  kind?: string;
}

export const DefaultButton = ({ children, ...props }: DefaultButtonProps) => {
  return (
    <Button className='button-primary' data-variant='primary' {...props}>
      {children}
    </Button>
  );
};
